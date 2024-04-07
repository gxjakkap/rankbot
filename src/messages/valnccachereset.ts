import { ColorResolvable, EmbedBuilder } from "discord.js"
import valAPI, { Regions } from "unofficial-valorant-api"

import { valapitoken } from "../config"

interface ValCacheresetRes {
    completed: boolean,
    message?: string,
    embed?: EmbedBuilder
}

interface ValAPIAccountData {
    puuid: string,
    region: Regions,
    account_level: number,
    name: string,
    tag: string,
    card: {
        small: string,
        large: string,
        wide: string,
        id: string
    },
    last_update: string,
    last_update_raw: number
}

const valAPIInstance = new valAPI() // FIXME: valAPI should take token as argument but doesn't

const hitPlayerDataEndpoint = async (playerName: string, tag: string) => {
    const data = await valAPIInstance.getAccount({
        name: playerName,
        tag: tag
    })
    return data
}

export const valnccacheresetMessage = async (name: string, tag: string): Promise<ValCacheresetRes> => {

    const res = await hitPlayerDataEndpoint(name, tag)

    //404 response: for player that doesn't exist and unranked player that has never played rank.
    if (!res.data || res.status===404){
        console.log(typeof name)
        let namef = name
        if (Array.isArray(name)){
            namef = name.replace(',', ' ')
        }
        return {
            completed: false,
            message: `Player ${namef}#${tag} not found.`
        }
    }

    const data = (res.data as ValAPIAccountData)

    const card = data.card.small
    
        
    const fields = [
        {name: "Name", value: `${data.name}#${data.tag}`},
        {name: "Region", value: data.region.toUpperCase()},
        {name: "Last API Update", value: data.last_update}
    ]
    const msg = new EmbedBuilder()
        .setColor([147, 181, 198])
        .setAuthor({name: "Cache reset for"})
        .setImage(card) 
        .setFooter({text: "Data provided by henrikdev.xyz"})
        .addFields(fields)
    return {
        completed: true,
        embed: msg
    }
}