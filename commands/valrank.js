const { processRiotTags } = require("../utils/val")
const { valrankMessage } = require("../messages/valrankRes")

exports.run = (client, message, args) => {
    const region = args[0]
    args.splice(0, 1)
    const riotTag = processRiotTags(args)
    if (!riotTag){
        message.reply("Invalid Riot Tag!") //invalid riot tags
        return
    }

    valrankMessage(riotTag.name, riotTag.tag, region).then(res => {
        if (!res[0]){
            message.reply(res[1])
            return
        }
        message.reply({embeds: [res[1]]})
    })

}

exports.name = "valrank"
exports.aliases = ["vlr", "valorantrank"]
exports.desc = "Get VALORANT rank for requested player. Args:[Region, RiotTag]"