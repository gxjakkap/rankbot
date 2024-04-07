import { CacheType, ChatInputCommandInteraction, InteractionType, Message } from "discord.js"

/**
 * msgSendFailHandler
 * 
 * Prevent bot from crashing after promise reject.
 */
export const msgSendFailHandler = (source: (Message<boolean>)|(ChatInputCommandInteraction<CacheType>), err: any) => {
    const now = new Date()
    console.error(`[${now.toISOString()}][Err] Error while sending message to #${source.channel?.toString() || source.id} (${source.guild ? "Guild" : "Direct"})`)
}