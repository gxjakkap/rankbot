import { ChannelType, Events, Guild } from "discord.js"
import { createClient } from "redis"

import { guildLeaveLogger } from "../utils/logging"
import { BotEvent } from "../types/types"
import { redisUrl } from "../config"

const event: BotEvent = {
    name: Events.GuildDelete,
    type: "on",
    execute: async(guild : Guild) => {
        guildLeaveLogger(guild)
        
        const redis = await createClient({
            url: redisUrl
        }).connect()

        const prefix = await redis.get(guild.id)
        if (prefix){
            await redis.del(guild.id)
        }
        await redis.disconnect()
    }
}

export default event