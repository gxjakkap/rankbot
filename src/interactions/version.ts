import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { versionMessage } from "../messages/version"

const ValRank = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription("Display instance information"),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.deferReply()
        try{
            const message = await versionMessage()
            interaction.editReply({ embeds: message })
        }
        catch (e){
            console.error(e)
            try{
                await interaction.reply("Error.")
            }
            catch {
                await interaction.editReply("Error.")
            }
        }  
    }
}

export default ValRank