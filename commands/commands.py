from commands.base_command import BaseCommand

class Commands(BaseCommand):

    def __init__(self):
        description = "Displays this help message"
        params = None
        super().__init__(description, params)

    async def handle(self, params, message, client):
        from message_handler import COMMAND_HANDLERS
        pmsg = '**Available commands**' + "\n"

        # Displays all descriptions, sorted alphabetically by command name
        for cmd in sorted(COMMAND_HANDLERS.items()):
            pmsg += cmd[1].description + "\n"

        msg = '>>> {}'.format(pmsg)

        #await message.channel.send(msg)
        await message.channel.send(message.author.mention + "\n" + msg),