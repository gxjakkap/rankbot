import requests
import discord
import misc
import asyncio
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
        nt = ' '.join(ntl)
        l = misc.spl(nt)
        length = len(l)
        i = 0
        for i in range(length):
            if l[i] == ' ':
                 l[i] = '%20'
        try:
            ind = l.index('#')
        except:
            await message.channel.send(message.author.mention+"\n"+"Tagline missing")
        ignl = l[:ind]
        tagl = l[ind+1:]
        ign = ''.join(ignl)
        tag = ''.join(tagl)
        r = requests.get('https://api.henrikdev.xyz/valorant/v1/mmr/'+reg+'/'+ign+'/'+tag)
        r.encoding = 'utf-8'
        try:
            ans = r.json()
        except:
            await message.channel.send(message.author.mention+"\n"+'JSON Decode error')
        try:
            x  = ans['data']
            rankName = x['currenttierpatched']
            rankPoint = str(x['ranking_in_tier'])+'RP'
            ingameName = str(x['name'])+'#'+str(x['tag'])
            rankColor = misc.getvalrankcolor(x['currenttier'])
            msg = discord.Embed(Title="Results", color=discord.Color.from_rgb(rankColor[0], rankColor[1], rankColor[2]))
            msg.add_field(name="Name", value=ingameName, inline=False)
            msg.add_field(name="Rank", value=rankName, inline=False)
            msg.add_field(name="Rank Point", value=rankPoint, inline=False)
            msg.set_image(url=misc.getvalrankpic(x['currenttier']))
            await asyncio.gather(
                message.channel.send(message.author.mention + "\n"),
                message.channel.send(embed=msg)
            )
        except:
            await message.channel.send(message.author.mention+"\n"+ans['message'])
        
