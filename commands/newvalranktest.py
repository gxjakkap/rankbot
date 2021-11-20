import requests
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
            rankName = x['currenttierpatched']
            rankPoint = str(x['ranking_in_tier'])+'RP'
            ingameName = str(x['name'])+'#'+str(x['tag'])
            msg = discord.Embed(Title="Results", color=discord.Color.from_rgb(147, 181, 198))
            msg.add_field(name="Name", value=ingameName, inline=False)
            msg.add_field(name="Rank", value=rankName, inline=False)
            msg.add_field(name="Rank Point", value=rankPoint, inline=False)
            msg.set_image(url=misc.getvalrankpic(x['currenttier']))
            await message.channel.send(embed=msg)
        except:
            pmsg = ans['message']
            await message.channel.send(pmsg)
        
