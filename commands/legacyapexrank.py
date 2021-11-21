import requests
import asyncio
import discord
import misc
import settings
from commands.base_command  import BaseCommand

class legapexrank(BaseCommand):
    def __init__(self):
        description = "**[Legacy]** Get Apex Legends rank for requested player"
        params = ["platform", "handler"]
        super().__init__(description, params)
    

    async def handle(self, params, message, client):
        platform = params[0]
        platup = platform.upper()
        nl = params
        nl.remove(platform)
        name = ''.join(nl)
        try:
            r = requests.get('https://api.mozambiquehe.re/bridge?version=5&platform='+platup+'&player='+name+'&auth='+settings.APEXKEY)
            res = r.json()
            if "Error" in res:
                msg = res['Error']
                await message.channel.send(msg)
            else:
                x = res['global']
                y = x['rank']
                plyrname = x['name']
                resp = plyrname,':',y['rankName'],str(y['rankDiv']),str(y['rankScore']),'RP'
                pmsg = ' '.join(resp)
                platmes = '**['+platup+']**'
                tmsg = platmes, pmsg
                msg = ' '.join(tmsg)
                await asyncio.gather(message.channel.send(msg), message.channel.send(file=discord.File(misc.getapexrankpic(y['rankName'], y['rankDiv']))))
        except:
            msg = 'Unknown Error'
            await message.channel.send(msg)