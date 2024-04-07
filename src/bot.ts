import { Client, GatewayIntentBits, Collection, SlashCommandBuilder, Routes } from "discord.js"
import { REST } from "@discordjs/rest"
import { createClient } from "redis"
import { readdirSync } from "fs"
import { join } from "path"

import { BotEvent, Command, SlashCommand } from "./types"
import { token, clientId, redisUrl } from "./config"

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration
	],
})

//collections
client.interactions = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.aliases = new Collection<string, string>()

//register commands
const commandsDirectory = join(__dirname, "commands")
readdirSync(commandsDirectory).forEach(file => {
	const command: Command = require(join(commandsDirectory, file)).default
	console.log(`Attempting to load command ${command.name}`)
	if (command.aliases){
		command.aliases.forEach(alias => {
			client.aliases.set(alias, command.name)
		})
	}
	client.commands.set(command.name, command)
})

//load interactions
const interactions: SlashCommandBuilder[] = []
const interactionsDirectory = join(__dirname, "interactions")
readdirSync(interactionsDirectory).forEach(file => {
	const command = require(`${interactionsDirectory}/${file}`).default
    interactions.push(command.data.toJSON())
    client.interactions.set(command.data.name, command)
})

//register interactions
const rest = new REST({ version: "10" }).setToken(token);
(async () => {
	try {
		console.log(`Started refreshing ${interactions.length} application (/) commands.`);
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: interactions },
		)
		
		console.log(`Successfully reloaded ${interactions.length} application (/) commands.`);
	} catch (error) {
		console.error(error)
	}
})()

//load events
const eventsDirectory = join(__dirname, "events")
readdirSync(eventsDirectory).forEach(file => {
	const event: BotEvent = require(`${eventsDirectory}/${file}`).default
	if (event.type === "on"){
		client.on(event.name, (...args) => {
			event.execute(...args)
		})
	}
	else if (event.type === "once"){
		client.once(event.name, (...args) => {
			event.execute(client, ...args)
		})
	}
	else {
		console.error(`Error while loading event '${event.name}. (type missing)'`)
	}
})

client.login(token)
