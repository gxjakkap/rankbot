import { Client, GatewayIntentBits } from "discord.js"
import { turso } from "../src/utils/db"
import { token } from "../src/config"
import { Events } from "discord.js"

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

client.once(Events.ClientReady, (client) => {
    console.log("All guilds list:")
    client.guilds.cache.forEach(g => {
        console.log(g.name)
    })
    console.log("Now begin seeding the database.")
    turso.execute("SELECT name FROM guild").then(result => {
        console.log(result.rows)
        if (result.rows.length<=0) {
            let data: any = []
            client.guilds.cache.forEach((guild) => {
                data.push({ sql: "INSERT INTO guild VALUES (?, ?, ?)", args: [guild.id, guild.name, Date.now()]})
            })
            console.log(data)
            turso.batch(data, "write").then((res) => {
                console.log("Seeding done. You can now exit.")
            })
        }
    })
})

client.login(token)

