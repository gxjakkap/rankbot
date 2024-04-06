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
            valLdbMessage(interaction.options.getString('name') as string, interaction.options.getString('tag') as string, interaction.options.getString('region') as string).then(res => {
                if (!res.completed){
                    if (res.message){
                        interaction.editReply(res.message)
                    }
                    else {
                        interaction.editReply("Message Error!")
                    }
                    return
                }
                else {
                    if (res.embed){
                        interaction.editReply({embeds: [res.embed]})
                    }
                    else {
                        interaction.editReply("Message Error!")
                    }
                }
            })
        }
        catch{
            try{
                interaction.reply("Error.")
            }
            catch {
                interaction.editReply("Error.")
            }
        }  
    }
}

export default ValLdbInter