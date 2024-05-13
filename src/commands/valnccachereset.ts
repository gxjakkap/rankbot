import { valnccacheresetMessage } from "../messages/valnccachereset"
import { processRiotTags } from "../utils/val"
import { Command } from "../types/types"
import { msgSendFailHandler } from "../utils/discord"

const command : Command = {
    name: "valnccachereset",
    run: (message, args) => {
        const riotTag = processRiotTags(args)
        if (!riotTag){
            message.reply("Invalid Riot Tag!") //invalid riot tags
            return
        }

        valnccacheresetMessage(riotTag.name, riotTag.tag).then(res => {
            if (!res.completed){
                if (res.message){
                    message.reply(res.message).catch(err => { msgSendFailHandler(message, err) })
                }
                else {
                    message.reply("Message Error!").catch(err => { msgSendFailHandler(message, err) })
                }
                return
            }
            else {
                if (res.embed){
                    message.reply({embeds: [res.embed]}).catch(err => { msgSendFailHandler(message, err) })
                }
                else {
                    message.reply("Message Error!").catch(err => { msgSendFailHandler(message, err) })
                }
            }
        })
    },
    aliases: ["valcachereset", "vlrreset"],
    desc: "Reset cache after name change for VAL. Args:[RiotTag]"
}

export default command