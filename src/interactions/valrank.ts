import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { valrankMessage } from "../messages/valrankres"
import { valRegionOptions } from "../utils/val"

const ValRank = {
    data: new SlashCommandBuilder()
        .setName('valrank')
        .setDescription("Get VALORANT Player's rank")
        .addStringOption(options => options.setName('region').setDescription("Player's Region").setRequired(true).addChoices(...valRegionOptions))
        .addStringOption(options => options.setName('name').setDescription("Player's name").setRequired(true))
        .addStringOption(options => options.setName('tag').setDescription("Player's tagline").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.deferReply()
        try{
            const playerName = interaction.options.getString('name')
            const tagline = interaction.options.getString('tag')
            const region = interaction.options.getString('region')
            valrankMessage(playerName as string, tagline as string, region as string).then(res => {
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

export default ValRank