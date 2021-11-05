import requests
import settings
import misc
import asyncio
import discord
from commands.base_command  import BaseCommand

class psapexrank(BaseCommand):
    def __init__(self):
        description = "Get Apex Legends PS4 rank for requested player"
        params = ["id"]
        super().__init__(description, params)
    

    async def handle(self, params, message, client):
        try:
            name = params[0]
            r = requests.get('https://api.mozambiquehe.re/bridge?version=5&platform=PS4&player='+name+'&auth='+settings.APEXKEY)
            res = r.json()
            if "Error" in res:
                msg = res['Error']
            else:
                x = res['global']
                y = x['rank']
                plyrname = x['name']
                resp = plyrname,':',y['rankName'],str(y['rankDiv']),str(y['rankScore']),'RP'
                msg = ' '.join(resp)
        except:
            msg = 'Unknown Error'
        #await message.channel.send(msg)
        await asyncio.gather(message.channel.send(msg), message.channel.send(file=discord.File(misc.getapexrankpic(y['rankName'], y['rankDiv']))))
