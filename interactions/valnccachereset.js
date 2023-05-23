const { SlashCommandBuilder } = require("discord.js")
const { valnccacheresetMessage } = require("../messages/valnccacheresetRes")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('valnccachereset')
        .setDescription("Reset cache after name change for VAL")
        .addStringOption(options => options.setName('name').setDescription("Player's name").setRequired(true))
        .addStringOption(options => options.setName('tag').setDescription("Player's tagline").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply()
        try{
            valnccacheresetMessage(interaction.options.getString('name'), interaction.options.getString('tag')).then(res => {
                if (!res[0]){
                    interaction.editReply(res[1])
                    return
                }
                interaction.editReply({embeds: [res[1]]})
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