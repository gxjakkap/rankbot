import { apexarenaMessage } from "../messages/apexarenares"
import { Command } from "../types/types"
import { msgSendFailHandler } from "../utils/discord"

const command : Command = {
    name: "apexarena",
    run: (message, args) => {
        if (args.length > 2){
            message.reply("Too many arguments! If you're using a Steam name, Please use player's Origin username instead.")
        }
        const platform = args[0]
        args.splice(0, 1)
        const handle = args.toString()

        apexarenaMessage(handle, platform).then(res => {
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
    aliases: ["aa", "aarena"],
    desc: "Get Apex Legends Arena mode rank for requested player. Args:[Platform, Handle]"
}

export default command