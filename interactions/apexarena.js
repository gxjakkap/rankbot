const { SlashCommandBuilder} = require("discord.js")
const { apexarenaMessage } = require("../messages/apexarenaRes")
const { apexPlatformsOptions } = require("../utils/apex")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apexarena')
        .setDescription("Get Apex Legends Player's arena rank")
        .addStringOption(options => options.setName('platform').setDescription("Player's platform").setRequired(true).addChoices(...apexPlatformsOptions))
        .addStringOption(options => options.setName('handle').setDescription("Player's name or handler").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const platform = interaction.options.getString('platform')
        const handle = interaction.options.getString('handle')
        try{
            apexarenaMessage(handle, platform)
            .then(res => {
                if (!res[0]){
                    interaction.editReply(res[1])
                    return
                }
                interaction.editReply({embeds: [res[1]]})
            })
            .catch(err => {console.log(err); interaction.editReply("Error.")})
        }
        catch{
            interaction.editReply("Error.")
        }  
    }
}