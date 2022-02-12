import requests
import nextcord
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
        r = requests.get(f'https://api.henrikdev.xyz/valorant/v1/mmr/{reg}/{ign}/{tag}')
        r.encoding = 'utf-8'
        try:
            ans = r.json()
        except:
            if r.status_code==204:
                r = requests.get(f'https://api.henrikdev.xyz/valorant/v1/account/{ign}/{tag}')
                r.encoding = 'utf-8'
                ans = r.json()
                ingameName = ans['data']['name']+'#'+ans['data']['tag']
                msg = nextcord.Embed(color=nextcord.Color.from_rgb(110,114,118))
                msg.set_author(name="VALORANT Competitive", icon_url="https://cdn.statically.io/img/raw.githubusercontent.com/w=20,h=20/gxjakkap/rankbot-img/main/img/gameicon/val.png")
                msg.add_field(name="Name", value=ingameName, inline=False)
                msg.add_field(name="Region", value=reg.upper(), inline=False)
                msg.add_field(name="Rank", value="Unranked", inline=False)
                msg.set_image(url=misc.getvalrankpic(0))
                msg.set_footer(text="Data provided by henrikdev.xyz")
                await asyncio.gather(
                    message.channel.send(message.author.mention + "\n"),
                    message.channel.send(embed=msg)
                )
            else:
                await message.channel.send(message.author.mention+"\n"+"There's an error decoding JSON response. Please try again later.")
        try:
            x  = ans['data']
            rankName = x['currenttierpatched']
            rankPoint = str(x['ranking_in_tier'])+'RP'
            ingameName = str(x['name'])+'#'+str(x['tag'])
            rankColor = misc.getvalrankcolor(x['currenttier'])
            msg = nextcord.Embed(color=nextcord.Color.from_rgb(rankColor[0], rankColor[1], rankColor[2]))
            msg.set_author(name="VALORANT Competitive", icon_url="https://cdn.statically.io/img/raw.githubusercontent.com/w=20,h=20/gxjakkap/rankbot-img/main/img/gameicon/val.png")
            msg.add_field(name="Name", value=ingameName, inline=False)
            msg.add_field(name="Region", value=reg.upper(), inline=False)
            msg.add_field(name="Rank", value=rankName, inline=True)
            msg.add_field(name="Rank Point", value=rankPoint, inline=True)
            msg.set_image(url=misc.getvalrankpic(x['currenttier']))
            msg.set_footer(text="Data provided by henrikdev.xyz")
            await asyncio.gather(
                message.channel.send(message.author.mention + "\n"),
                message.channel.send(embed=msg)
            )
        except:
            if r.status_code==429 and ans['message']=="Riot Origin Server Rate Limit, try again later":
                await message.channel.send(message.author.mention+"\nRate Limit Error: Requested player likely changed their Riot ID recently. Try again later or try querying their old name.")
            else:
                await message.channel.send(message.author.mention+"\n"+ans['message'])
        
