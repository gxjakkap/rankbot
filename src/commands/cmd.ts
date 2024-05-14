import { EmbedBuilder } from "discord.js"
import { readdirSync } from "fs"
import { join } from "path"
import { prefix } from "../config"
import { Command } from "../types/types"
import { msgSendFailHandler } from "../utils/discord"

const commands = readdirSync(__dirname).filter(file => file.endsWith(".ts"))
const commandCollections: { name: string, desc: string}[] = []
const helpCommands = ["cmd"]

for (const file of commands) {
    const commandName = file.split(".")[0]
    if (helpCommands.includes(commandName)){
        continue
    }
    const command: Command = require(join(__dirname, file)).default
    console.log(`[CMREG] Loaded command ${command.name}`)
    commandCollections.push({name: command.name, desc: command.desc})
}

const command : Command = {
    name: "cmd",
    run: (message, args) => {
        let pmsg = ''
        commandCollections.forEach(item => {
            pmsg += `**${prefix}${item.name}**: ${item.desc}\n\n`
        })
        const fields = [
            {name: "List", value: pmsg},
        ]
        const msg = new EmbedBuilder()
            .setColor([147, 181, 198])
            .setAuthor({name: "Available Commands"})
            .addFields(fields)
        message.reply({embeds: [msg]}).catch(err => { msgSendFailHandler(message, err) })
    },
    aliases: ["help", "commands"],
    desc: "Display all commands available for Rankbot."
}

export default command