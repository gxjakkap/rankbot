import { ActivityType, Client, Events } from "discord.js"
import { turso } from "../utils/db"
import { BotEvent } from "../types"

const event : BotEvent = {
    name: Events.ClientReady,
    type: "once",
    execute: (client : Client) => {
        client.user?.setPresence({
            activities: [{ name: "ranked game", type: ActivityType.Playing }],
            status: 'dnd'
        })
        console.log(`Ready! Logged in as ${client.user?.tag}`)

        console.log("Currently in these guilds:")
        client.guilds.cache.forEach(g => {
            console.log(g.name)
        })
    }
}

export default event