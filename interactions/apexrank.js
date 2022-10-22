const { SlashCommandBuilder} = require("discord.js")
const { apexrankMessage } = require("../messages/apexrankRes")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apexrank')
        .setDescription("Get Apex Legends Player's rank")
        .addStringOption(options => options.setName('platform').setDescription("Player's platform").setRequired(true))
        .addStringOption(options => options.setName('handle').setDescription("Player's name or handler").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const platform = interaction.options.getString('platform')
        const handle = interaction.options.getString('handle')
        try{
            apexrankMessage(handle, platform)
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