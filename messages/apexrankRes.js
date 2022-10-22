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

exports.apexrankMessage = async(handle, platform) => {
    if (!validplatforms.includes(platform.toUpperCase())){
        return [false, "Invalid platform!"]
    }
    const res = await getPlayerRank(handle, platform.toUpperCase())
    const globalObject = res.data.global
    const fields = [
        {name: "Name", value: `${globalObject.name}`},
        {name: "platform", value: platform.toUpperCase()},
        {name: "Rank", value: `${globalObject.rank.rankName} ${globalObject.rank.rankDiv}`, inline: true},
        {name: "RP", value: globalObject.rank.rankScore.toString(), inline: true}
    ]
    const msg = new EmbedBuilder()
        .setColor(getApexRankColor(globalObject.rank.rankName))
        .setAuthor({name: "Apex Legends Competitive"})
        .setImage(getApexRankImgLink(globalObject.rank.rankName, globalObject.rank.rankDiv)) 
        .setFooter({text: "Data provided by Apexlegendsapi.com"})
        .addFields(fields)
    return [true, msg]
    
}