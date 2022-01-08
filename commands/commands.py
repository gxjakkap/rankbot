import nextcord
import asyncio
from commands.base_command import BaseCommand

class commands(BaseCommand):

    def __init__(self):
        description = "Displays this help message"
        params = None
        super().__init__(description, params)

    async def handle(self, params, message, client):
        from message_handler import COMMAND_HANDLERS
        #pmsg = '**Available commands**' + "\n"
        pmsg = ''

        # Displays all descriptions, sorted alphabetically by command name
        for cmd in sorted(COMMAND_HANDLERS.items()):
            pmsg += cmd[1].description + "\n"

        #msg = '>>> {}'.format(pmsg)
        msg = pmsg+"\nMore help at https://github.com/gxjakkap/rankbot/wiki"
        embed = nextcord.Embed(color=nextcord.Color.from_rgb(147, 181, 198))
        embed.add_field(name="Commands", value=msg)

        #await message.channel.send(msg)
        await asyncio.gather(message.channel.send(message.author.mention),message.channel.send(embed=embed))