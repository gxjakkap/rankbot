import { apexarenaMessage } from "../messages/apexarenares"
import { Command } from "../types"

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
    aliases: ["aa", "aarena"],
    desc: "Get Apex Legends Arena mode rank for requested player. Args:[Platform, Handle]"
}

export default command