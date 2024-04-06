import { valnccacheresetMessage } from "../messages/valnccachereset"
import { processRiotTags } from "../utils/val"
import { Command } from "../types"

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
    aliases: ["valcachereset", "vlrreset"],
    desc: "Reset cache after name change for VAL. Args:[RiotTag]"
}

export default command