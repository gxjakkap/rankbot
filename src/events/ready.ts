import { ActivityType, Client, Events } from "discord.js"
import Git from 'nodegit'
import axios from "axios"
import { discordStatusWebhook } from "../config"
import { BotEvent } from "../types/types"

const event : BotEvent = {
    name: Events.ClientReady,
    type: "once",
    execute: async (client : Client) => {
        client.user?.setPresence({
            activities: [{ name: "ranked game", type: ActivityType.Playing }],
            status: 'dnd'
        })
        const repo = await Git.Repository.open('.')
        const commit = await repo.getHeadCommit()
        console.log(`Ready! Logged in as ${client.user?.tag}`)
        console.log(`Running on commit: ${commit.sha()}`)
        console.log(`Committer: ${commit.committer()}`)
        console.log(`Commit Message: ${commit.message()}`)
        console.log("Currently in these guilds:")
        client.guilds.cache.forEach(g => {
            console.log(g.name)
        })
        if (discordStatusWebhook){
            const bt = "`"
            const now = new Date()
            await axios.post(discordStatusWebhook, {
                embeds: [
                    {
                        author: {
                            name: client.user?.tag,
                            icon_url: client.user?.avatarURL()
                        },
                        fields: [
                            {
                                name: "",
                                value: `${bt}${client.user?.tag}${bt} is now online!`
                            },
                            {
                                name: "Time",
                                value: now.toISOString()
                            },
                            {
                                name: "Commit",
                                value: `${bt}${commit.sha().substring(0, 8)}${bt}: ${commit.message()}`
                            }
                        ]
                    }
                ]
            })
        }
    }
}

export default event