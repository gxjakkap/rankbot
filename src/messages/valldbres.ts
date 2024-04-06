import { ColorResolvable, EmbedBuilder } from "discord.js"
import axios from "axios"
//import valAPI, { Regions } from "unofficial-valorant-api"

import { getValRankColor } from "../utils/color"
import { getValRankImgLink } from "../utils/image"
import { getValRanknameFromCompetitiveTier, validregion } from "../utils/val"
import { valapitoken } from "../config"

interface ValLeaderboardRes {
    completed: boolean,
    message?: string,
    embed?: EmbedBuilder
}

/* const valAPIInstance = new valAPI()  */// FIXME: valAPI leaderboard doesn't work

/* const getPlayerRank = async (playerName: string, tag: string, region: string) => {
    const mmr = await valAPIInstance.getMMR({
        version: 'v1',
        region: region as Regions,
        name: playerName,
        tag: tag
    })
    return mmr
} */

const statusValidator = (statusCode: number) => {
    //wip better status code handler
    return true
}

const getLeaderboardRank = async (playerName: string, tag: string, region: string) => {
    const ldbpos = await axios({method: "GET", url: `https://api.henrikdev.xyz/valorant/v2/leaderboard/${region}?name=${playerName}&tag=${tag}`, validateStatus: statusValidator})
    return ldbpos.data
}

export const valLdbMessage = async (name: string, tag: string, region: string): Promise<ValLeaderboardRes> => {

    //verify region
    if (!validregion.includes(region.toLowerCase())){
        return {
            completed: false,
            message: "Invalid Region"
        }
    }

    let namef = name
    namef = name.replace(',', ' ')

    const res = await getLeaderboardRank(namef, tag, region)


    //404 response: for player that doesn't exist and unranked player that has never played rank.
    if (!res.data || res.status===404){
        console.log(typeof name)
        return {
            completed: false,
            message: `Data not found. Maybe ${namef}#${tag} is **not** on the leaderboard.`
        }
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
    return {
        completed: true,
        embed: msg
    }
}

