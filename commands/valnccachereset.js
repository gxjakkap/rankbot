const { processRiotTags } = require("../utils/val")
const { valnccacheresetMessage } = require("../messages/valnccacheresetRes")

exports.run = (client, message, args) => {
    const riotTag = processRiotTags(args)
    if (!riotTag){
        message.reply("Invalid Riot Tag!") //invalid riot tags
        return
    }

    valnccacheresetMessage(riotTag.name, riotTag.tag).then(res => {
        if (!res[0]){
            message.reply(res[1])
            return
        }
        message.reply({embeds: [res[1]]})
    })

}

exports.name = "valnccachereset"
exports.aliases = []
exports.desc = "Reset cache after name change for VAL. Args:[RiotTag]"