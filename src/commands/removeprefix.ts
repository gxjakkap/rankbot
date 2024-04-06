import { createClient } from "redis"
import { Command } from "../types"
import { redisUrl, prefix } from "../config"

const command : Command = {
    name: "removeprefix",
    run: async(message, args) => {
        if (!message.guild){
            // not possible anyway. added just to shut typescript up.
            return
        }

        if (!(message.member?.permissions.has("Administrator") || message.member?.permissions.has("ManageGuild"))){
            message.reply("You don't have enough permission. Contact server administrator.")
            return
        }

        if (args.length > 0){
            message.reply("Too many argument(s). Required `none`")
            return
        }

        const redis = await createClient({
            url: redisUrl
        }).connect()

        const res = await redis.del(message.guild.id)
        if (res === 200){
            const rep = "Prefix for `" + message.guild?.name + "` is now `" + prefix + "`"
            message.reply(rep)        
        }
        else {
            message.reply("Prefix changing might failed.")
        }

        await redis.disconnect()
    },
    aliases: ["rmprefix", "resetprefix"],
    desc: "Reset prefix for current server to default."
}

export default command