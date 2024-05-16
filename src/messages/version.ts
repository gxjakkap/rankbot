import axios from "axios"
import prettySeconds from 'pretty-seconds'
import { EmbedBuilder } from "discord.js"
import { getCurrentVersion } from "../utils/git"
import { mainInstancePassword } from "../config"

const verifyMainInstance = async () => {
    if (!mainInstancePassword || mainInstancePassword.length < 1){
        return false
    }
    const res = await axios.post('https://guntxjakka.me/api/rankbotmaininstanceverify', { pw: mainInstancePassword })
    return (res.status === 200)
}

export const versionMessage = async (): Promise<EmbedBuilder[]> => {
    const { commit, diff } = await getCurrentVersion()
    const uptime = prettySeconds(Math.floor(process.uptime()))
    let msg = []

    const fields = [
        {name: "Commit", value: commit.message()},
        {name: "Diff", value: `${diff[1] - diff[0]}`},
        {name: "Uptime", value: uptime}
    ]

    const embed = new EmbedBuilder()
        .setColor([147, 181, 198])
        .setAuthor({name: "Instance details"})
        .setFooter({text: "Rankbot v3"})
        .setURL(`https://github.com/gxjakkap/rankbot/commit/${commit.sha()}`)
        .addFields(fields)
    
    msg.push(embed)

    if ((await verifyMainInstance())){
        const mainInstanceMsg = new EmbedBuilder()
            .setColor([147, 181, 198])
            .addFields([{name: "*", value: "**This is the main instance of Rankbot.**"}])
        msg.push(mainInstanceMsg)
    }

    return msg
}

