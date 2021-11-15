import requests
import asyncio
import discord
import misc
from commands.base_command  import BaseCommand

class valrank(BaseCommand):
    def __init__(self):
        description = "Get VALORANT rank for requested player. Specify regions in first parameter: AP, NA, KR, EU."
        params = ["region", "ign with tagline"]
        super().__init__(description, params)

    async def handle(self, params, message, client):
        reg = params[0]
        ntl = params
        ntl.remove(reg)
        nt = ''.join(ntl)
        l = misc.spl(nt)
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
        r = requests.get('https://api.henrikdev.xyz/valorant/v1/mmr/'+reg+'/'+ign+'/'+tag)
        r.encoding = 'utf-8'
        ans = r.json()
        try:
            x  = ans['data']
            pmsg = '**[',reg.upper(),']** ',str(x['name']),'#',str(x['tag']),': ',str(x['currenttierpatched']),' ',str(x['ranking_in_tier']),' RP'
            msg = ''.join(pmsg)
            await asyncio.gather(message.channel.send(msg), message.channel.send(file=discord.File(misc.getvalrankpic(x['currenttier']))))
        except:
            pmsg = ans['message']
            await message.channel.send(pmsg)
        
