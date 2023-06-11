const valapi = require("unofficial-valorant-api")
const { EmbedBuilder } = require("discord.js")
const { valapitoken } = require("../config.json")


const validregion = ["ap", "br", "eu", "kr", "latam", "na"]
const api = new valapi(valapitoken)

const hitPlayerDataEndpoint = async (playerName, tag) => {
    const data = await api.getAccount({
        version: 'v1',
        name: playerName,
        tag: tag
    })
    return data
}

exports.valnccacheresetMessage = async (name, tag) => {

    const res = await hitPlayerDataEndpoint(name, tag)

    //404 response: for player that doesn't exist and unranked player that has never played rank.
    if (!res.data || res.status===404){
        console.log(typeof name)
        let namef = name
        if (Array.isArray(name)){
            namef = name.replace(',', ' ')
        }
        return [false, `Player ${namef}#${tag} not found.`]
    }

    const card = res.data.card.small
    
        
    const fields = [
        {name: "Name", value: `${res.data.name}#${res.data.tag}`},
        {name: "Region", value: res.data.region.toUpperCase()},
        {name: "Last API Update", value: res.data.last_update}
    ]
    const msg = new EmbedBuilder()
        .setColor([147, 181, 198])
        .setAuthor({name: "Cache reset for"})
        .setImage(card) 
        .setFooter({text: "Data provided by henrikdev.xyz"})
        .addFields(fields)
    return [true, msg]
}