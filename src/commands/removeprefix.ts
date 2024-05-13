import { createClient } from "redis"
import { Command } from "../types/types"
import { redisUrl, prefix } from "../config"
import { msgSendFailHandler } from "../utils/discord"

const command : Command = {
    name: "removeprefix",
    run: async(message, args) => {
        if (!message.guild){
            // not possible anyway. added just to shut typescript up.
            return
        }

        if (!(message.member?.permissions.has("Administrator") || message.member?.permissions.has("ManageGuild"))){
            message.reply("You don't have enough permission. Contact server administrator.").catch(err => { msgSendFailHandler(message, err) })
            return
        }

        if (args.length > 0){
            message.reply("Too many argument(s). Required `none`").catch(err => { msgSendFailHandler(message, err) })
            return
        }

        const redis = await createClient({
            url: redisUrl
        }).connect()

        const res = await redis.del(message.guild.id)
        if (res === 1){
            const rep = "Prefix for `" + message.guild?.name + "` is now `" + prefix + "`"
            message.reply(rep).catch(err => { msgSendFailHandler(message, err) })
        }
        else {
            message.reply("Prefix changing might failed.").catch(err => { msgSendFailHandler(message, err) })
        }

        await redis.disconnect()
    },
    aliases: ["rmprefix", "resetprefix"],
    desc: "Reset prefix for current server to default."
}

export default command