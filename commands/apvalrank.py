import requests
import asyncio
import discord
import misc
from commands.base_command  import BaseCommand

class apvalrank(BaseCommand):
    def __init__(self):
        description = "Get VALORANT rank for requested player, APAC only"
        params = ["ign with tagline"]
        super().__init__(description, params)

    async def handle(self, params, message, client):
        pr = ''.join(params)
        l = misc.spl(pr)
        length = len(l)
        i = 0
        for i in range(length):
            if l[i] == ' ':
                 l[i] = '%20'
        ind = l.index('#')
        ignl = l[:ind]
        tagl = l[ind+1:]
        ign = ''.join(ignl)
        tag = ''.join(tagl)
        r = requests.get('https://api.henrikdev.xyz/valorant/v1/mmr/ap/'+ign+'/'+tag)
        r.encoding = 'utf-8'
        ans = r.json()
        try:
            x  = ans['data']
            pmsg = str(x['name']),'#',str(x['tag']),': ',str(x['currenttierpatched']),' ',str(x['ranking_in_tier']),' RP'
        except:
            pmsg = ans['message']
        msg = ''.join(pmsg)
        await asyncio.gather(
            message.channel.send(msg), 
            message.channel.send(file=discord.File(misc.getrankpic(x['currenttier'])))
            )
