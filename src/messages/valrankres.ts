import { ColorResolvable, EmbedBuilder } from "discord.js"
import valAPI, { Regions } from "unofficial-valorant-api"

import { getValRankColor } from "../utils/color"
import { getValRankImgLink } from "../utils/image"
import { validregion } from "../utils/val"
import { valapitoken } from "../config"
import axios from "axios"

interface ValRankData {
    currenttier: number,
    currenttierpatched: string,
    images: {
        small?: string,
        large?: string,
        triangle_down?: string,
        triangle_up?: string,
    },
    ranking_in_tier: number,
    mmr_change_to_last_game: number,
    elo: number,
    name: string,
    tag: string,
    old: boolean
}

interface ValRankRes {
    completed: boolean,
    message?: string,
    embed?: EmbedBuilder
}

//const valAPIInstance = new valAPI() // FIXME: valAPI should take token as argument but doesn't

const getPlayerRank = async (playerName: string, tag: string, region: string) => {
    /* const mmr = await valAPIInstance.getMMR({
        version: 'v1',
        region: region as Regions,
        name: playerName,
        tag: tag
    })
    return mmr */
    const res = await axios.get(
        `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${playerName}/${tag}`, 
        { 
            headers: { 
                Authorization: valapitoken, 
                'User-Agent': 'Rankbot/3.0' 
            } 
        }
    )
    return res.data
}

export const valrankMessage = async (name: string, tag: string, region: string): Promise<ValRankRes> => {

    //verify region
    if (!validregion.includes(region.toLowerCase())){
        return {
            completed: false,
            message: "Invalid Region"
        }
    }

    const res = await getPlayerRank(name, tag, region)

    console.log(res)

    let namef = name

    //404 response: for player that doesn't exist and unranked player that has never played rank.
    if (!res.data || res.status===404){
        console.log(typeof name)
        if (Array.isArray(name)){
            namef = name.replace(',', ' ')
        }
        return {
            completed: false,
            message: `Data not found. Either ${namef}#${tag} is **unranked** or simply doesn't exist.`
        }
    }

    const data = (res.data as ValRankData)

    const rankPoint = data['ranking_in_tier'] || 0
    const rankName = data.currenttierpatched

    //sometimes unranked player also return a null data with a 200 code. mostly from player that hasn't played ranked in a long time.
    if (!rankName){
        if (Array.isArray(name)){
            namef = name.replace(',', ' ')
        }
        const fields = [
            {name: "Name", value: `${namef}#${tag}`},
            {name: "Region", value: region.toUpperCase()},
            {name: "Rank", value: `Unranked`},
        ]
        const msg = new EmbedBuilder()
            .setColor(getValRankColor(0) as ColorResolvable)
            .setAuthor({name: "VALORANT Competitive"})
            .setImage(getValRankImgLink(0)) 
            .setFooter({text: "Data provided by henrikdev.xyz"})
            .addFields(fields)
        return {
            completed: true,
            embed: msg
        }
    }

    const cdnUrl = getValRankImgLink(data.currenttier)
        
    const fields = [
        {name: "Name", value: `${data.name}#${data.tag}`},
        {name: "Region", value: region.toUpperCase()},
        {name: "Rank", value: rankName, inline: true},
        {name: "RP", value: rankPoint.toString(), inline: true}
    ]
    const msg = new EmbedBuilder()
        .setColor(getValRankColor(data.currenttier))
        .setAuthor({name: "VALORANT Competitive"})
        .setImage(cdnUrl) 
        .setFooter({text: "Data provided by henrikdev.xyz"})
        .addFields(fields)
    return {
        completed: true,
        embed: msg
    }
}

