import requests
import asyncio
import nextcord
import misc
import settings
from commands.base_command  import BaseCommand

class apexrank(BaseCommand):
    def __init__(self):
        description = "Get Apex Legends rank for requested player"
        params = ["platform", "handler"]
        super().__init__(description, params)
    

    async def handle(self, params, message, client):
        platform = params[0]
        platup = platform.upper()
        nl = params
        nl.remove(platform)
        name = ''.join(nl)
        try:
            r = requests.get(f'https://api.mozambiquehe.re/bridge?version=5&platform={platup}&player={name}', headers={"Authorization": settings.APEXKEY})
            res = r.json()
            if "Error" in res:
                await message.channel.send(message.author.mention, res['Error'])
            else:
                x = res['global']
                y = x['rank']
                plyrname = x['name']
                rankName = y['rankName']
                rankDiv = y['rankDiv']
                if plyrname.lower()==name.lower():
                    namedisplay = plyrname
                else:
                    namedisplay = plyrname+'*('+name+')*'
                if rankDiv>=1:
                    rankTuple = rankName,str(rankDiv)
                    rank = ' '.join(rankTuple)
                elif rankName=='Master': # Master will display rankName without rankDiv
                    rank = rankName
                else: #Apex Predator will also display rankName without rankDiv
                    rank = rankName
                rankScore = str(y['rankScore'])
                rankColor = misc.getapexrankcolor(rankName)
                msg = nextcord.Embed(color=nextcord.Color.from_rgb(rankColor[0], rankColor[1], rankColor[2]))
                msg.set_author(name="Apex Legends Ranked League", icon_url="https://cdn.statically.io/img/raw.githubusercontent.com/w=20,h=20/gxjakkap/rankbot-img/main/img/gameicon/apex.png")
                msg.set_thumbnail(url=misc.getapexplatpic(platform))
                msg.add_field(name="Name", value=namedisplay, inline=False)
                msg.add_field(name="Platform", value=platup, inline=False)
                msg.add_field(name="Rank", value=rank, inline=True)
                msg.add_field(name="Rank Point", value=rankScore, inline=True)
                msg.set_image(url=misc.getapexrankpic(rankName, rankDiv))
                msg.set_footer(text="Data provided by apexlegendsapi.com")
                await asyncio.gather(message.channel.send(message.author.mention + "\n"),message.channel.send(embed=msg))
        except:
            await message.channel.send(message.author.mention+"\n"+'Unknown Error')