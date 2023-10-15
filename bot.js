const { Client, Events, GatewayIntentBits, Collection, REST, Routes, ActivityType } = require('discord.js');
const { token, clientId, prefix } = require('./config.json');
const fs = require("fs")
const Logging = require('./utils/logging')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

// update presence and log bot's discord tag on ready
client.once(Events.ClientReady, c => {
	client.user.setPresence({
		activities: [{name: "ranked game", type: ActivityType.Playing}],
		status: 'dnd'
	});
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

//message commands collection
client.commands = new Collection()
client.aliases = new Collection()
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of commands) {
    const commandName = file.split(".")[0]
    const command = require(`./commands/${file}`)
    console.log(`Attempting to load command ${commandName}`)
	if (command.aliases){
		command.aliases.forEach(alias => {
			client.aliases.set(alias, commandName)
		})
	}
    client.commands.set(commandName, command)
}

//message commands handler
client.on(Events.MessageCreate, message => {
    if (message.author.bot) return;
    if (message.content.includes("@here") || message.content.includes("@everyone")) return;
    if (message.content.indexOf(prefix) !== 0) return;

	if (message.mentions.has(client.user.id) && message.type !== 'REPLY') {
        message.reply(`My prefix is "${prefix}". Try running ${prefix}help for a list of command.`)
    }

	Logging.commandLogger('MSG', message.guild, message.author.tag, message.content)


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

	// check for aliases
	const aliasCommand = client.aliases.get(command)
	if (aliasCommand){
		const rcmd = client.commands.get(aliasCommand)
		rcmd.run(client, message, args)
		return
	}

    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args)
})

//interaction commands collection
const interactions = []
const interactionFiles = fs.readdirSync('./interactions').filter(file => file.endsWith('.js'));
client.interactions = new Collection();
for (const file of interactionFiles) {
    const command = require(`./interactions/${file}`);
    interactions.push(command.data.toJSON());
    client.interactions.set(command.data.name, command);
}

//register interaction commands
const rest = new REST().setToken(token);
(async () => {
	try {
		console.log(`Started refreshing ${interactions.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: interactions },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

//interaction commands handler
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.interactions.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		Logging.commandLogger('INTER', interaction.guild.name, interaction.user.tag, `${interaction.commandName} ${Logging.unpackOptions(interaction.options.data)}`)
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);