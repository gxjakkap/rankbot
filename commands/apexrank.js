const { apexrankMessage } = require("../messages/apexrankRes")

exports.run = (client, message, args) => {
    if (args.length > 2){
        message.reply("Too many arguments! If you're using a Steam name, Please use player's Origin username instead.")
    }
    const platform = args[0]
    args.splice(0, 1)
    const handle = args.toString()
    apexrankMessage(handle, platform)
    .then(res => {
        if (!res[0]){
            message.reply(res[1])
            return
        }
        message.reply({embeds: [res[1]]})
    })
    
}

exports.name = "apexrank"
exports.aliases = ["ar", "arank"]
exports.desc = "Get Apex Legends rank for requested player. Args:[Platform, Handle]"