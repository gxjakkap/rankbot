import { versionMessage } from "../messages/version"
import { msgSendFailHandler } from "../utils/discord"
import { Command } from "../types/types"

const command : Command = {
    name: "version",
    run: (message, args) => {
        versionMessage()
            .then(msg => {
                message.reply({ embeds: msg })
            })
            .catch(err => { msgSendFailHandler(message, err) })
    },
    aliases: ["info"],
    desc: "Display instance information"
}

export default command