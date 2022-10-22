const valapi = require("unofficial-valorant-api")
const { EmbedBuilder } = require("discord.js")
const { valapitoken } = require("../config.json")
const { getValRankColor } = require("../utils/color")
const { getValRankImgLink } = require("../utils/img")

const validregion = ["ap", "br", "eu", "kr", "latam", "na"]
const api = new valapi(valapitoken)

const getPlayerRank = async (playerName, tag, region) => {
    const mmr = await api.getMMR({
        version: 'v1',
        region: region,
        name: playerName,
        tag: tag
    })
    return mmr
}

exports.valrankMessage = async (name, tag, region) => {

    //verify region
    if (!validregion.includes(region.toLowerCase())){
        return [false, "Invalid Region!"]
    }

    const res = await getPlayerRank(name, tag, region)
    if (!res.data || res.status===404){
        return [false, `API returns 404. Either ${name}#${tag} is unranked or simply doesn't exist.`]
    }

    const rankPoint = res.data.ranking_in_tier
    const rankName = res.data.currenttierpatched
    const cdnUrl = getValRankImgLink(res.data.currenttier)
    const fields = [
        {name: "Name", value: `${res.data.name}#${res.data.tag}`},
        {name: "Region", value: region.toUpperCase()},
        {name: "Rank", value: rankName, inline: true},
        {name: "RP", value: rankPoint.toString(), inline: true}
    ]
    const msg = new EmbedBuilder()
        .setColor(getValRankColor(res.data.currenttier))
        .setAuthor({name: "VALORANT Competitive"})
        .setImage(cdnUrl) 
        .setFooter({text: "Data provided by henrikdev.xyz"})
        .addFields(fields)
    return [true, msg]
}