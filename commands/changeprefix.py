import json
from commands.base_command import BaseCommand

class prefix(BaseCommand):

    def __init__(self):
        description = "Change command prefix for current server"
        params = ["mode: current , change <new prefix>"]
        super().__init__(description, params)

    async def handle(self, params, message, client):
        if params[0] == "change":
            if message.author.guild_permissions.administrator:
                inp = params[1]
                with open('prefix.json', 'r') as f:
                    prefixes = json.load(f)
                prefixes[str(message.guild.id)] = inp
                with open('prefix.json', 'w') as f:
                    json.dump(prefixes, f, indent=4)
                await message.channel.send(message.author.mention+"\n"+"Prefix changed to "+inp+" for "+message.guild.name)
            else:
                await message.channel.send(message.author.mention+"\n"+"You don't have permission to change prefix!")
        elif params[0] == "current":
            with open('prefix.json', 'r') as f:
                    prefixes = json.load(f)
            currentprefix = prefixes[str(message.guild.id)]
            await message.channel.send(message.author.mention+"\n"+"Prefix for "+message.guild.name+" is: "+currentprefix)
        else:
            await message.channel.send(message.author.mention+"\n"+"Invalid argument!")

