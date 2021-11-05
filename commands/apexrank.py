import requests
import asyncio
import discord
import misc
import settings
from commands.base_command  import BaseCommand

class apexrank(BaseCommand):
    def __init__(self):
        description = "Get Apex Legends PC rank for requested player"
        params = ["origin id"]
        super().__init__(description, params)
    

    async def handle(self, params, message, client):
        try:
            name = params[0]
            r = requests.get('https://api.mozambiquehe.re/bridge?version=5&platform=PC&player='+name+'&auth='+settings.APEXKEY)
            res = r.json()
            if "Error" in res:
                msg = res['Error']
                await message.channel.send(msg)
            else:
                x = res['global']
                y = x['rank']
                plyrname = x['name']
                resp = plyrname,':',y['rankName'],str(y['rankDiv']),str(y['rankScore']),'RP'
                msg = ' '.join(resp)
                await asyncio.gather(message.channel.send(msg), message.channel.send(file=discord.File(misc.getapexrankpic(y['rankName'], y['rankDiv']))))
        except:
            msg = 'Unknown Error'
            await message.channel.send(msg)
        #await message.channel.send(msg)
