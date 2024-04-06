import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { valnccacheresetMessage } from "../messages/valnccachereset"

const ValNccacheResetInter = {
    data: new SlashCommandBuilder()
        .setName('valnccachereset')
        .setDescription("Reset cache after name change for VAL")
        .addStringOption(options => options.setName('name').setDescription("Player's name").setRequired(true))
        .addStringOption(options => options.setName('tag').setDescription("Player's tagline").setRequired(true)),
    async execute(interaction: ChatInputCommandInteraction<CacheType>) {
        await interaction.deferReply()
        try{
            valnccacheresetMessage(interaction.options.getString('name') as string, interaction.options.getString('tag') as string).then(res => {
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

export default ValNccacheResetInter