import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js"
import type { RedisClientType } from "redis"

export interface SlashCommand {
    data: SlashCommandBuilder,
    execute: (interaction : ChatInputCommandInteraction) => Promise<void>,
    modal?: (interaction: ModalSubmitInteraction<CacheType>) => void,
}

export interface Command {
    name: string,
    run: ((message: Message, args: Array<string>) => void) | ((message: Message, args: Array<string>) => Promise<void>),
    aliases: Array<string>,
    desc: string
}

export interface BotEvent {
    name: string,
    type: "once" | "on",
    execute: ((...args?) => void) | ((...args?) => Promise<void>)
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            PREFIX: string,
            MONGO_URI: string,
            MONGO_DATABASE_NAME: string
        }
    }
}

declare module "discord.js" {
    export interface Client {
        interactions: Collection<string, SlashCommand>,
        commands: Collection<string, Command>,
        aliases: Collection<string, string>
    }
}