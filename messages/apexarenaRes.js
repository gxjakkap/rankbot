const { EmbedBuilder } = require("discord.js")
const axios = require("axios")
const { getApexRankColor } = require("../utils/color")
const { getApexRankImgLink } = require("../utils/img")
const { apexapitoken } = require("../config.json")


const validplatforms = ["PC", "PS4", "X1"]

const getPlayerRank = async (playerName, platform) => {
    const requests = await axios.get(`https://api.mozambiquehe.re/bridge?player=${playerName}&platform=${platform}`, {headers: {"Authorization": apexapitoken, "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"}})
    return requests
}

exports.apexarenaMessage = async(handle, platform) => {
    if (!validplatforms.includes(platform.toUpperCase())){
        return [false, "Invalid platform!"]
    }
    const res = await getPlayerRank(handle, platform.toUpperCase())
    const globalObject = res.data.global
    const fields = [
        {name: "Name", value: `${globalObject.name}`},
        {name: "platform", value: platform.toUpperCase()},
        {name: "Rank", value: `${globalObject.arena.rankName} ${globalObject.arena.rankDiv}`, inline: true},
        {name: "RP", value: globalObject.arena.rankScore.toString(), inline: true}
    ]
    const msg = new EmbedBuilder()
        .setColor(getApexRankColor(globalObject.arena.rankName))
        .setAuthor({name: "Apex Legends Arena Ranked"})
        .setImage(getApexRankImgLink(globalObject.arena.rankName, globalObject.arena.rankDiv)) 
        .setFooter({text: "Data provided by Apexlegendsapi.com"})
        .addFields(fields)
    return [true, msg]
    
}