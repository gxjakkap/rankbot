import { ChannelType, Events, Guild } from "discord.js"
import { guildJoinLogger } from "../utils/logging"
import { BotEvent } from "../types"
import { prefix } from "../config"

const event: BotEvent = {
    name: Events.GuildCreate,
    type: "on",
    execute: (guild : Guild) => {
      guildJoinLogger(guild)
      const welcomeMessage = {
        content: `Hi! I'm ${guild.client.user.toString()} ✨. Wanna know any VALORANT/Apex player's rank? I've got you!🎮\n\n`,
        tts: false,
        embeds: [
          {
            description: `📑Check out my commands at: https://rankbot.guntxjakka.me/ \n\n**My default prefix is ${"`" + prefix + "`"}**`,
            fields: [],
            title: "Commands",
            url: "https://rankbot.guntxjakka.me/"
          },
          {
            title: "Privacy Notice",
            description: "🗒️This bot does collect some data for analytics. Review our privacy policy here.\n\nhttps://dyn.guntxjakka.me/rankbotprivacypolicy",
            color: 2326507,
            fields: [],
            url: "https://dyn.guntxjakka.me/rankbotprivacypolicy"
          }
        ]
      }
      if (guild.systemChannel){
        guild.systemChannel.send(welcomeMessage)
      }
      else {
        guild.channels.cache.some(c => {
            if (c.type === ChannelType.GuildText){
                c.send(welcomeMessage)
                return true
            }
        })
      }
    }
}

export default event