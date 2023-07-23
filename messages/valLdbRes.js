const valapi = require("unofficial-valorant-api")
const axios = require('axios')
const { EmbedBuilder } = require("discord.js")
const { getValRanknameFromCompetitiveTier } = require("../utils/val")
const { valapitoken } = require("../config.json")
const { getValRankColor } = require("../utils/color")
const { getValRankImgLink } = require("../utils/img")


const validregion = ["ap", "br", "eu", "kr", "latam", "na"]
/* const api = new valapi(valapitoken) */

const statusValidator = (statusCode) => {
    //wip better status code handler
    return true
} 

const getLeaderboardRank = async (playerName, tag, region) => {
    /* const mmr = await api.getMMR({
        version: 'v1',
        region: region,
        name: playerName,
        tag: tag
    })
    return mmr */
    const ldbpos = await axios({method: "GET", url: `https://api.henrikdev.xyz/valorant/v2/leaderboard/${region}?name=${playerName}&tag=${tag}`, validateStatus: statusValidator})
    return ldbpos.data
}

exports.valLdbMessage = async (name, tag, region) => {

    //verify region
    if (!validregion.includes(region.toLowerCase())){
        return [false, "Invalid Region!"]
    }

    const res = await getLeaderboardRank(name, tag, region)

    let namef = name

    //404 response: for player that doesn't exist and unranked player that has never played rank.
    if (!res.data || res.status===404){
        console.log(typeof name)
        namef = name.replace(',', ' ')
        /* if (Array.isArray(name)){
            namef = name.replace(',', ' ')
        } */
        return [false, `Data not found. Maybe ${namef}#${tag} is **not** on the leaderboard.`]
    }

    const playerData = res.data[0]

    const rankName = `${getValRanknameFromCompetitiveTier(playerData.competitiveTier)} #${playerData.leaderboardRank}`
    const cdnUrl = getValRankImgLink(playerData.competitiveTier)
        
    const fields = [
        {name: "Name", value: `${playerData.gameName}#${playerData.tagLine}`},
        {name: "Region", value: region.toUpperCase()},
        {name: "Rank", value: rankName, inline: true},
        {name: "Wins", value: playerData.numberOfWins.toString(), inline: true},
    ]

    console.log(fields)

    const msg = new EmbedBuilder()
        .setColor(getValRankColor(playerData.competitiveTier))
        .setAuthor({name: "VALORANT Leaderboard"})
        .setImage(cdnUrl) 
        .setFooter({text: "Data provided by henrikdev.xyz"})
        .addFields(fields)
    return [true, msg]
}