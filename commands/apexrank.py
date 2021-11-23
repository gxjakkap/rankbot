import requests
import asyncio
import discord
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
        '''try:
            r = requests.get('https://api.mozambiquehe.re/bridge?version=5&platform='+platup+'&player='+name+'&auth='+settings.APEXKEY)
            res = r.json()
            if "Error" in res:
                msg = res['Error']
                await message.channel.send(msg)
            else:
                x = res['global']
                y = x['rank']
                plyrname = x['name']
                rankName = y['rankName']
                rankDiv = str(y['rankDiv'])
                if plyrname.lower()==name.lower():
                    namedisplay = plyrname
                else:
                    namedisplay = plyrname+'*('+name+')*'
                    rankName = y['rankName']
                    rankDiv = y['rankDiv']
                if rankDiv>=1:
                    rankTuple = rankName,rankDiv
                    rank = ' '.join(rankTuple)
                elif rankName=='Master': # Master will display rankName without rankDiv
                    rank = rankName
                else: #Apex Predator will also display rankName without rankDiv
                    rank = rankName
                rankScore = str(y['rankScore'])
                msg = discord.Embed(Title="Results", color=discord.Color.from_rgb(147, 181, 198))
                msg.add_field(name="Name", value=namedisplay, inline=False)
                msg.add_field(name="Platform", value=platup, inline=False)
                msg.add_field(name="Rank", value=rank, inline=False)
                msg.add_field(name="Rank Point", value=rankScore, inline=False)
                msg.set_image(url=misc.getapexrankpic(rankName, rankDiv))
                await asyncio.gather(
                message.channel.send(message.author.mention + "\n"),
                message.channel.send(embed=msg)
            )
        except:
            msg = 'Unknown Error'
            await message.channel.send(msg)'''
        r = requests.get('https://api.mozambiquehe.re/bridge?version=5&platform='+platup+'&player='+name+'&auth='+settings.APEXKEY)
        res = r.json()
        if "Error" in res:
            msg = res['Error']
            await message.channel.send(msg)
        else:
            x = res['global']
            y = x['rank']
            plyrname = x['name']
            rankName = y['rankName']
            rankDiv = str(y['rankDiv'])
            if plyrname.lower()==name.lower():
                namedisplay = plyrname
            else:
                namedisplay = plyrname+'*('+name+')*'
                rankName = y['rankName']
                rankDiv = y['rankDiv']
            if rankDiv>=1:
                rankTuple = rankName,str(rankDiv)
                rank = ' '.join(rankTuple)
            elif rankName=='Master': # Master will display rankName without rankDiv
                rank = rankName
            else: #Apex Predator will also display rankName without rankDiv
                rank = rankName
            rankScore = str(y['rankScore'])
            msg = discord.Embed(Title="Results", color=discord.Color.from_rgb(147, 181, 198))
            msg.add_field(name="Name", value=namedisplay, inline=False)
            msg.add_field(name="Platform", value=platup, inline=False)
            msg.add_field(name="Rank", value=rank, inline=False)
            msg.add_field(name="Rank Point", value=rankScore, inline=False)
            msg.set_image(url=misc.getapexrankpic(rankName, rankDiv))
            await asyncio.gather(
            message.channel.send(message.author.mention + "\n"),
            message.channel.send(embed=msg)
            )