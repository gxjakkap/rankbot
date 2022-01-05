import requests
import nextcord
import misc
import asyncio
from commands.base_command  import BaseCommand

class valrankhis(BaseCommand):
    def __init__(self):
        description = "Get VALORANT latest rank game details for requested player. Specify regions in first parameter: AP, NA, KR, EU."
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
        r = requests.get(f'https://v2-api.henrikdev.xyz/valorant/v1/account/{ign}/{tag}')
        r.encoding = 'utf-8'
        try:
            ans = r.json()
        except:
            if r.status_code==204:
                 await message.channel.send(message.author.mention+"\n"+"This Player either never played competitive or haven't played competitive in a while. (API returns no content/204)")
            else:
                await message.channel.send(message.author.mention+"\n"+"There's an error decoding JSON response. Please try again later.")
        try:
            x = ans['data']
        except:
            await message.channel.send(ans['message'])
        body = {"type": "competitiveupdates","value": x['puuid'],"region": reg,"queries": "?queue=competitive"}
        r2 = requests.post('https://v2-api.henrikdev.xyz/valorant/v1/raw', json = body)
        postans = r2.json()
        diff = postans['Matches'][0]['RankedRatingEarned']
        map = postans['Matches'][0]['MapID']
        r3 = requests.get(f'http://v2-api.henrikdev.xyz/valorant/v2/match/{postans['Matches'][0]['MatchID']}')
        r3ans = r3.json()
        matchresults = str(r3ans['data']['teams']['red']['rounds_won'])+' - '+str(r3ans['data']['teams']['blue']['rounds_won'])
        if postans['Matches'][0]['TierAfterUpdate'] > postans['Matches'][0]['TierBeforeUpdate']:
            status = '+'+str(diff)+' Promoted'
            wl = 'Win'
            color = [102,194,169]
        elif postans['Matches'][0]['TierAfterUpdate'] == postans['Matches'][0]['TierBeforeUpdate']:
            if r3ans['data']['teams']['red']['rounds_won']==r3ans['data']['teams']['blue']['rounds_won']:
                if diff>0:
                    status = '+'+str(diff)
                else:
                    status = str(diff)
                wl = 'Draw'
                color = [109, 119, 116]
            else:
                if diff >0:
                    status = '+'+str(diff)
                    wl = 'Win'
                    color = [102,194,169]
                else:
                    status = str(diff)
                    wl = 'Lose'
                    color = [237,92,89]
        else:
            status = str(diff)+' Demoted'
            wl = 'Lose'
            color = [237,92,89]
        msg = nextcord.Embed(Title="Results", color=nextcord.Color.from_rgb(color[0], color[1], color[2]))
        msg.set_author(name=x['name']+"'s latest competitive match", icon_url="https://cdn.statically.io/img/raw.githubusercontent.com/w=20,h=20/gxjakkap/rankbot-img/main/img/gameicon/val.png")
        msg.add_field(name="Map", value=misc.getvalmapname(map))
        msg.add_field(name="Results (Red-Blue)", value=matchresults)
        msg.add_field(name="RR Change", value=status, inline=True)
        msg.add_field(name="Results", value=wl, inline=True)
        msg.set_image(url=misc.getvalmappic(postans['Matches'][0]['MapID']))
        msg.set_footer(text="Data provided by henrikdev.xyz")
        await asyncio.gather(
                message.channel.send(message.author.mention + "\n"),
                message.channel.send(embed=msg)
            )
        
