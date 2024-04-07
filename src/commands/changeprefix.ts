import { createClient } from "redis"
import { Command } from "../types"
import { redisUrl } from "../config"

const command : Command = {
    name: "changeprefix",
    run: async(message, args) => {
        if (!message.guild){
            // not possible anyway. added just to shut typescript up.
            return
        }

        if (!(message.member?.permissions.has("Administrator") || message.member?.permissions.has("ManageGuild"))){
            message.reply("You don't have enough permission. Contact server administrator.")
            return
        }

        if (args.length !== 1){
            message.reply("Too many or too few argument(s). Required `1`")
            return
        }

        const newPrefix = args[0]

        if (newPrefix.length > 10){
            message.reply("Prefix too long!")
            return
        }

        const redis = await createClient({
            url: redisUrl
        }).connect()

        const res = await redis.set(message.guild.id, newPrefix)
        if (res === "OK"){
            const rep = "Prefix for `" + message.guild?.name + "` is now `" + newPrefix + "`"
            message.reply(rep)        
        }
        else {
            message.reply("Prefix changing might failed. If the prefix doesn't work, try using default prefix.")
        }

        await redis.disconnect()
    },
    aliases: ["prefix"],
    desc: "Change prefix for current server."
}

export default command