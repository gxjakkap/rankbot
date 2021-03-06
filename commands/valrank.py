import nextcord
import misc
from sendreq import valapiget
from commands.base_command import BaseCommand


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

        ans = valapiget(
            f'https://api.henrikdev.xyz/valorant/v1/mmr/{reg}/{ign}/{tag}')
        try:
            x = ans['data']
            rankName = x['currenttierpatched']
            if rankName == None:
                msg = nextcord.Embed(
                    color=nextcord.Color.from_rgb(110, 113, 118))
                msg.set_author(name="VALORANT Competitive")
                msg.add_field(name="Name", value=f'{ign}#{tag}', inline=False)
                msg.add_field(name="Region", value=reg.upper(), inline=False)
                msg.add_field(name="Rank", value="Unranked", inline=True)
                msg.add_field(name="Rank Point", value="None", inline=True)
                msg.set_image(url=misc.getvalrankpic(0))
                msg.set_footer(text="Data provided by henrikdev.xyz")
                await message.reply(embed=msg)
            else:
                rankPoint = str(x['ranking_in_tier'])+'RP'
                ingameName = str(x['name'])+'#'+str(x['tag'])
                rankColor = misc.getvalrankcolor(x['currenttier'])
                msg = nextcord.Embed(color=nextcord.Color.from_rgb(
                    rankColor[0], rankColor[1], rankColor[2]))
                msg.set_author(name="VALORANT Competitive")
                msg.add_field(name="Name", value=ingameName, inline=False)
                msg.add_field(name="Region", value=reg.upper(), inline=False)
                msg.add_field(name="Rank", value=rankName, inline=True)
                msg.add_field(name="Rank Point", value=rankPoint, inline=True)
                msg.set_image(url=misc.getvalrankpic(x['currenttier']))
                msg.set_footer(text="Data provided by henrikdev.xyz")
                await message.reply(embed=msg)
        except:
            if ans['status'] == 429 and ans['message'] == "Riot Origin Server Rate Limit, try again later":
                await message.channel.send(message.author.mention+"\nRate Limit Error: Requested player likely changed their Riot ID recently. Try again later or try querying their old name.")
            else:
                await message.channel.send(message.author.mention+"\n"+ans['message'])
