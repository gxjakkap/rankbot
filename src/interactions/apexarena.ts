import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { apexarenaMessage } from "../messages/apexarenares"
import { apexPlatformsOptions } from "../utils/apex"

const ApexArenaInter = {
    data: new SlashCommandBuilder()
        .setName('apexarena')
        .setDescription("Get Apex Legends Player's rank")
        .addStringOption(options => options.setName('platform').setDescription("Player's platform").setRequired(true).addChoices(...apexPlatformsOptions))
        .addStringOption(options => options.setName('handle').setDescription("Player's name or handler (Origin)").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.deferReply()
        const platform = interaction.options.getString('platform') as string
        const handle = interaction.options.getString('handle') as string
        try{
            apexarenaMessage(handle, platform).then(res => {
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

export default ApexArenaInter