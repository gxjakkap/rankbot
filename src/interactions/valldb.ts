import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { valLdbMessage } from "../messages/valldbres"
import { valRegionOptions } from "../utils/val"

const ValLdbInter = {
    data: new SlashCommandBuilder()
        .setName('valldb')
        .setDescription("Get VALORANT Player's leaderboard position")
        .addStringOption(options => options.setName('region').setDescription("Player's Region").setRequired(true).addChoices(...valRegionOptions))
        .addStringOption(options => options.setName('name').setDescription("Player's name").setRequired(true))
        .addStringOption(options => options.setName('tag').setDescription("Player's tagline").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.deferReply()
        try{
            const res = await valLdbMessage(interaction.options.getString('name') as string, interaction.options.getString('tag') as string, interaction.options.getString('region') as string)
            if (!res.completed){
                if (res.message){
                    await interaction.editReply(res.message)
                }
                else {
                    await interaction.editReply("Message Error!")
                }
                return
            }
            else {
                if (res.embed){
                    await interaction.editReply({embeds: [res.embed]})
                }
                else {
                    await interaction.editReply("Message Error!")
                }
            }
        }
        catch{
            try{
                await interaction.reply("Error.")
            }
            catch {
                await interaction.editReply("Error.")
            }
        }  
    }
}

export default ValLdbInter