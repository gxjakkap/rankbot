import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { valnccacheresetMessage } from "../messages/valnccachereset"
import { msgSendFailHandler } from "../utils/discord"

const ValNccacheResetInter = {
    data: new SlashCommandBuilder()
        .setName('valnccachereset')
        .setDescription("Reset cache after name change for VAL")
        .addStringOption(options => options.setName('name').setDescription("Player's name").setRequired(true))
        .addStringOption(options => options.setName('tag').setDescription("Player's tagline").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.deferReply()
        try{
            const res = await valnccacheresetMessage(interaction.options.getString('name') as string, interaction.options.getString('tag') as string)
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

export default ValNccacheResetInter