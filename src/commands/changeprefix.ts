import { createClient } from "redis"
import { Command } from "../types/types"
import { redisUrl } from "../config"
import { msgSendFailHandler } from "../utils/discord"

const command : Command = {
    name: "changeprefix",
    run: async(message, args) => {
        if (!message.guild){
            // not possible anyway. added just to shut typescript up.
            return
        }

        if (!(message.member?.permissions.has("Administrator") || message.member?.permissions.has("ManageGuild"))){
            message.reply("You don't have enough permission. Contact server administrator.").catch(err => { msgSendFailHandler(message, err) })
            return
        }

        if (args.length !== 1){
            message.reply("Too many or too few argument(s). Required `1`").catch(err => { msgSendFailHandler(message, err) })
            return
        }

        const newPrefix = args[0]

        if (newPrefix.length > 10){
            message.reply("Prefix too long!").catch(err => { msgSendFailHandler(message, err) })
            return
        }

        const redis = await createClient({
            url: redisUrl
        }).connect()

        const res = await redis.set(message.guild.id, newPrefix)
        if (res === "OK"){
            const rep = "Prefix for `" + message.guild?.name + "` is now `" + newPrefix + "`"
            message.reply(rep).catch(err => { msgSendFailHandler(message, err) })
        }
        else {
            message.reply("Prefix changing might failed. If the prefix doesn't work, try using default prefix.").catch(err => { msgSendFailHandler(message, err) })
        }

        await redis.disconnect()
    },
    aliases: ["prefix"],
    desc: "Change prefix for current server."
}

export default command