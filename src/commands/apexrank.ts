import { apexrankMessage } from "../messages/apexrankres"
import { Command } from "../types"
import { msgSendFailHandler } from "../utils/discord"

const command : Command = {
    name: "apexrank",
    run: (message, args) => {
        if (args.length > 2){
            message.reply("Too many arguments! If you're using a Steam name, Please use player's Origin username instead.")
        }
        const platform = args[0]
        args.splice(0, 1)
        const handle = args.toString()

        apexrankMessage(handle, platform).then(res => {
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
    aliases: ["ar", "aprank"],
    desc: "Get Apex Legends rank for requested player. Args:[Platform, Handle]"
}

export default command