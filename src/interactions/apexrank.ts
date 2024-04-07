import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { apexrankMessage } from "../messages/apexrankres"
import { apexPlatformsOptions } from "../utils/apex"

const ApexRankInter = {
    data: new SlashCommandBuilder()
        .setName('apexrank')
        .setDescription("Get Apex Legends Player's rank")
        .addStringOption(options => options.setName('platform').setDescription("Player's platform").setRequired(true).addChoices(...apexPlatformsOptions))
        .addStringOption(options => options.setName('handle').setDescription("Player's name or handler (Origin)").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.deferReply()
        const platform = interaction.options.getString('platform') as string
        const handle = interaction.options.getString('handle') as string
        try{
            const res = await apexrankMessage(handle, platform)
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

export default ApexRankInter