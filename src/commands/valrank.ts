import { valrankMessage } from "../messages/valrankres"
import { processRiotTags } from "../utils/val"
import { Command } from "../types"

const command : Command = {
    name: "valrank",
    run: (message, args) => {
        const region = args[0]
        args.splice(0, 1)
        const riotTag = processRiotTags(args)
        if (!riotTag){
            message.reply("Invalid Riot Tag!") //invalid riot tags
            return
        }

        valrankMessage(riotTag.name, riotTag.tag, region).then(res => {
            if (!res.completed){
                if (res.message){
                    message.reply(res.message)
                }
                else {
                    message.reply("Message Error!")
                }
                return
            }
            else {
                if (res.embed){
                    message.reply({embeds: [res.embed]})
                }
                else {
                    message.reply("Message Error!")
                }
            }
        })
    },
    aliases: ["vlr", "valorantrank"],
    desc: "Get VALORANT rank for requested player. Args:[Region, RiotTag]"
}

export default command