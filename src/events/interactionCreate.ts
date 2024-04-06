import { Events, Interaction } from "discord.js"
import { BotEvent } from "../types"
import { commandLogger, unpackOptions } from "../utils/logging"

const event : BotEvent = {
    name: Events.InteractionCreate,
    type: "on",
    execute: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return
        const command = interaction.client.interactions.get(interaction.commandName)
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`)
            return
        }
        try {
            commandLogger('INTER', interaction.guild, interaction.user, `${interaction.commandName} ${unpackOptions(interaction.options.data)}`)
            await command.execute(interaction)
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}

export default event;