import { ChannelType, Events, Guild, PermissionFlagsBits } from "discord.js"
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
        console.log(guild.systemChannel.name)
        guild.systemChannel.send(welcomeMessage).catch((err) => {
          const now = new Date()
          console.error(`[${now.toISOString()}][Err] Error while sending message to system channel in the guild "${guild.name}" (${guild.id}).`)
          guild.channels.cache.some((c) => {
            if (!guild.members.me) return false
            if (c.type === ChannelType.GuildText && c.permissionsFor(guild.members.me).has(PermissionFlagsBits.SendMessages)){
              c.send(welcomeMessage).catch((err) => {
                const now = new Date()
                console.error(`[${now.toISOString()}][Err] Error while sending message to #${c.name} in the guild "${guild.name}" (${guild.id}).`)
              })
              return true
            }
          })
        })
      }
      else {
        guild.channels.cache.some((c) => {
          if (!guild.members.me) return false
          if (c.type === ChannelType.GuildText && c.permissionsFor(guild.members.me).has(PermissionFlagsBits.SendMessages)){
            c.send(welcomeMessage).catch((err) => {
              const now = new Date()
              console.error(`[${now.toISOString()}][Err] Error while sending message to #${c.name} in the guild "${guild.name}" (${guild.id}).`)
            })
            return true
          }
        })
      }
    }
}

export default event