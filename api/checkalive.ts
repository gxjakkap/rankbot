import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

const statusValidator = (statusCode: number) => {
  //wip better status code handler
  return true
}

const sendWebhook = async (checkFailed: boolean, tag: string, img: string, hash?: string, commitMsg?: string) => {
  const bt = "`"
  const now = new Date()

  if (checkFailed){
    await axios({
      method: "POST", 
      url: `${process.env.DISCORD_ALERT_WEBHOOK}`, 
      validateStatus: statusValidator, 
      data: {
        "embeds": [
          {
            "color": 15549239,
            "fields": [
              {
                "name": "",
                "value": "`Rankbot` failed welfare check! Bot might be down."
              },
              {
                "name": "Time",
                "value": now.toISOString()
              }
            ],
            "author": {
              "name": "Rankbot",
              "icon_url": "https://i.stack.imgur.com/frlIf.png"
            }
          }
        ],
      }
    })
  }
  else {
    await axios({
      method: "POST", 
      url: `${process.env.DISCORD_ALERT_WEBHOOK}`, 
      validateStatus: statusValidator, 
      data: {
        embeds: [
          {
            author: {
                name: tag,
                icon_url: img || "https://i.stack.imgur.com/frlIf.png"
            },
            fields: [
                {
                    name: "",
                    value: `${bt}${tag}${bt} passed welfare check.`
                },
                {
                    name: "Time",
                    value: now.toISOString()
                },
                {
                    name: "Commit",
                    value: `${bt}${hash?.substring(0, 8)}${bt}: ${commitMsg}`
                }
            ]
          }
        ]
      }
    })
  }
}
 
export default async function (request: VercelRequest, response: VercelResponse) {
  try {
    console.log(process.env.CHECK_URL)
    const res = await axios({ method: "GET", url: process.env.CHECK_URL || "", validateStatus: statusValidator })
    await sendWebhook(false, res.data['self'], res.data['avatar'], res.data['commit'], res.data['commit_msg'])
    response.status(200).json({
      status: 200,
      data: res.data
    })
  }
  catch (err) {
    console.log(err)
    await sendWebhook(true, "Rankbot", "https://i.stack.imgur.com/frlIf.png")
    response.status(200).json({
      status: 500
    })
  }
}