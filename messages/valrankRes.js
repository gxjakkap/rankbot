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

    let namef = name

    //404 response: for player that doesn't exist and unranked player that has never played rank.
    if (!res.data || res.status===404){
        console.log(typeof name)
        if (Array.isArray(name)){
            namef = name.replace(',', ' ')
        }
        return [false, `Data not found. Either ${namef}#${tag} is **unranked** or simply doesn't exist.`]
    }

    const rankPoint = res.data.ranking_in_tier
    const rankName = res.data.currenttierpatched
    const cdnUrl = getValRankImgLink(res.data.currenttier)

    //sometimes unranked player also return a null data with a 200 code. mostly from player that hasn't played ranked in a long time.
    if (!rankPoint || !rankName){
        const fields = [
            {name: "Name", value: `${name}#${tag}`},
            {name: "Region", value: region.toUpperCase()},
            {name: "Rank", value: `Unranked`},
        ]
        const msg = new EmbedBuilder()
            .setColor(getValRankColor(0))
            .setAuthor({name: "VALORANT Competitive"})
            .setImage(getValRankImgLink(0)) 
            .setFooter({text: "Data provided by henrikdev.xyz"})
            .addFields(fields)
        return [true, msg]
    }
        
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