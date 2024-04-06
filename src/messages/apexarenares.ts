import { ColorResolvable, EmbedBuilder } from "discord.js"
import axios from "axios"

import { validplatforms } from "../utils/apex"
import { getApexRankColor } from "../utils/color"
import { getApexRankImgLink } from "../utils/image"
import { apexapitoken } from "../config"

interface ApexArenaRes {
    completed: boolean,
    message?: string,
    embed?: EmbedBuilder
}

const getPlayerRank = async (playerName: string, platform: string) => {
    const requests = await axios.get(`https://api.mozambiquehe.re/bridge?player=${playerName}&platform=${platform}`, {headers: {"Authorization": apexapitoken, "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"}})
    return requests
}

export const apexarenaMessage = async(handle: string, platform: string): Promise<ApexArenaRes> => {
    if (!validplatforms.includes(platform.toUpperCase())){
        return {
            completed: false,
            message: "Invalid Platforms"
        }
    }
    const res = await getPlayerRank(handle, platform.toUpperCase())
    console.log(res)
    const globalObject = res.data.global
    const fields = [
        {name: "Name", value: `${globalObject.name}`},
        {name: "platform", value: platform.toUpperCase()},
        {name: "Rank", value: `${globalObject.arena.rankName} ${globalObject.arena.rankDiv}`, inline: true},
        {name: "RP", value: globalObject.arena.rankScore.toString(), inline: true}
    ]
    const msg = new EmbedBuilder()
        .setColor(getApexRankColor(globalObject.arena.rankName) as ColorResolvable)
        .setAuthor({name: "Apex Legends Arena Ranked"})
        .setImage(getApexRankImgLink(globalObject.arena.rankName, globalObject.arena.rankDiv)) 
        .setFooter({text: "Data provided by Apexlegendsapi.com"})
        .addFields(fields)
    return {
        completed: true,
        embed: msg
    }
    
}