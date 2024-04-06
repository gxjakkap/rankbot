import { Events, Message, MessageType } from "discord.js"
import { commandLogger } from "../utils/logging"
import { BotEvent } from "../types"
import { createClient } from "redis"

import * as config from "../config"

const defaultPrefix = config.prefix

const event: BotEvent = {
    name: Events.MessageCreate,
    type: "on",
    execute: async (message: Message) => {
        if (message.author.bot) return
        if (!message.member || message.member.user.bot) return
        if (message.content.includes("@here") || message.content.includes("@everyone")) return
        if (!message.guild) return

        const redis = await createClient({
            url: config.redisUrl
        }).connect()
        
        const prefix = await redis.get(message.guild.id) || defaultPrefix

        await redis.disconnect()

        if (message.mentions.has(message.client.user.id) && (message.type !== MessageType.Reply)) {
            message.reply(`My prefix${(prefix === defaultPrefix) ? '' : 'here'} is "${prefix}". Try running ${prefix}help for a list of command.`)
        }

        if (message.content.indexOf(prefix) !== 0) return

        commandLogger('MSG', message.guild, message.author, message.content)

        const args = message.content.slice(prefix.length).trim().split(/ +/g)

        let command = args.shift()
        command = command?.toLowerCase()

        // check for aliases
        const aliasCommand = message.client.aliases.get(command as string)
        if (aliasCommand){
            const rcmd = message.client.commands.get(aliasCommand)
            rcmd?.run(message, args)
            return
        }

        const cmd = message.client.commands.get(command as string)
        if (!cmd) return
        cmd.run(message, args)
    }
}

export default event