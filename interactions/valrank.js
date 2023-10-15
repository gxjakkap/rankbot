const { SlashCommandBuilder } = require("discord.js")
const { valrankMessage } = require("../messages/valrankRes")
const { valRegionOptions } = require("../utils/val")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('valrank')
        .setDescription("Get VALORANT Player's rank")
        .addStringOption(options => options.setName('region').setDescription("Player's Region").setRequired(true).addChoices(...valRegionOptions))
        .addStringOption(options => options.setName('name').setDescription("Player's name").setRequired(true))
        .addStringOption(options => options.setName('tag').setDescription("Player's tagline").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply()
        try{
            valrankMessage(interaction.options.getString('name'), interaction.options.getString('tag'), interaction.options.getString('region')).then(res => {
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