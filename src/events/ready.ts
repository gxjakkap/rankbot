import { ActivityType, Client, Events } from "discord.js"
import axios from "axios"
import { discordStatusWebhook } from "../config"
import { BotEvent } from "../types/types"
import { checkCurrentRepoStatus } from "../utils/git"

const event : BotEvent = {
    name: Events.ClientReady,
    type: "once",
    execute: async (client : Client) => {
        client.user?.setPresence({
            activities: [{ name: "ranked game", type: ActivityType.Playing }],
            status: 'dnd'
        })
        const commit = await checkCurrentRepoStatus(client)
        console.log("[GUILD] Currently in these guilds:")
        client.guilds.cache.forEach(g => {
            console.log(`[GUILD] ${g.name}`)
        })
        if (discordStatusWebhook){
            const bt = "`"
            const now = new Date()
            await axios.post(discordStatusWebhook, {
                embeds: [
                    {
                        author: {
                            name: client.user?.tag,
                            icon_url: client.user?.avatarURL()
                        },
                        fields: [
                            {
                                name: "",
                                value: `${bt}${client.user?.tag}${bt} is now online!`
                            },
                            {
                                name: "Time",
                                value: now.toISOString()
                            },
                            {
                                name: "Commit",
                                value: `${bt}${commit.sha().substring(0, 8)}${bt}: ${commit.message()}`
                            }
                        ]
                    }
                ]
            })
        }
    }
}

export default event