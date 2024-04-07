import { CacheType, CommandInteractionOption, Guild, User } from "discord.js"
import { turso } from "./db"

type GuildForLogging = Guild | null

const commandLogger = (type: string, guild: GuildForLogging, user: User, commands: string) => {
    const now = new Date()
    if (guild){
        console.log(`[${now.toISOString()}][${type}][${guild.name}] ${user.tag}: ${commands}`)
        turso.execute({ sql: "INSERT INTO logs (timestamp, actiontype, source, sourcetype, user, actions) VALUES (?, ?, ?, ?, ?, ?)", args: [Date.now(), type, `${guild.name} (${guild.id})`, "Guilds", user.tag, commands]})
    }
    else {
        //direct message
        console.log(`[${now.toISOString()}][${type}][Direct] ${user.tag}: ${commands}`)
        turso.execute({ sql: "INSERT INTO logs (timestamp, actiontype, source, sourcetype, user, actions) VALUES (?, ?, ?, ?, ?, ?)", args: [Date.now(), type, user.id, "Direct", user.tag, commands]})
    }
}

const guildJoinLogger = (guild: Guild) => {
    const now = new Date()
    console.log(`[${now.toISOString()}][GUILDJOIN]: ${guild.name} (${guild.id})`)
    turso.batch([
        { sql: "INSERT INTO guild VALUES (?, ?, ?)", args: [guild.id, guild.name, Date.now()]},
        { sql: "INSERT INTO logs (timestamp, actiontype, source, sourcetype, user, actions) VALUES (?, ?, ?, ?, ?, ?)", args: [Date.now(), "GUILDJOIN", guild.id, "Guild", guild.ownerId, `Joined ${guild.name}`]}
    ], "write")
}

const guildLeaveLogger = (guild: Guild) => {
    const now = new Date()
    console.log(`[${now.toISOString()}][GUILDLEAVE]: ${guild.name} (${guild.id})`)
    turso.batch([
        { sql: "DELETE FROM guild WHERE ID=?", args: [guild.id]},
        { sql: "INSERT INTO logs (timestamp, actiontype, source, sourcetype, user, actions) VALUES (?, ?, ?, ?, ?, ?)", args: [Date.now(), "GUILDLEAVE", guild.id, "Guild", guild.ownerId, `Leaved ${guild.name}`]}
    ], "write")
}


const unpackOptions = (options: readonly CommandInteractionOption<CacheType>[]) => {
    let os = ""
    options.forEach((o) => {
        os = os + `${o.name}:${o.value} `
    })
    return os.trimEnd()
}

export { commandLogger, guildJoinLogger, guildLeaveLogger, unpackOptions }