import sys
import settings
import discord
import message_handler
import misc
import json

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from multiprocessing                import Process

# Set to remember if the bot is already running, since on_ready may be called
# more than once on reconnects
this = sys.modules[__name__]
this.running = False

# Scheduler that will be used to manage events
sched = AsyncIOScheduler()


###############################################################################

def main():
    # Initialize the client
    print("Starting up...")
    client = discord.Client()

    # Define event handlers for the client
    # on_ready may be called multiple times in the event of a reconnect,
    # hence the running flag
    @client.event
    async def on_ready():
        if this.running:
            return

        this.running = True

        # Set the playing status
        if settings.NP_STATUS:
            if settings.NP_MODE=="STREAM":
                print("Setting NP as STREAM mode", flush=True)
                await client.change_presence(activity=discord.Streaming(name=settings.NP_STATUS, url=settings.NP_URL))
            elif settings.NP_MODE=="LISTEN":
                print("Setting NP as LISTEN mode", flush=True)
                await client.change_presence(activity=discord.Activity(type=discord.ActivityType.listening, name=settings.NP_STATUS))
            elif settings.NP_MODE=="WATCH":
                print("Setting NP as WATCH mode", flush=True)
                await client.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name=settings.NP_STATUS))
            elif settings.NP_MODE=="GAME":
                print("Setting NP as GAME mode", flush=True)
                await client.change_presence(activity=discord.Game(name=settings.NP_STATUS))
            else: 
                print("NP mode not recognized, Setting NP as GAME mode", flush=True)
                await client.change_presence(activity=discord.Game(name=settings.NP_STATUS))
        print("Logged in!", flush=True)

    # The message handler for both new message and edits
    async def common_handle_message(message):
        text = message.content
        prefix = misc.getprefix(message.guild.id)
        if text.startswith(prefix) and text != prefix:
            cmd_split = text[len(prefix):].split()
            try:
                await message_handler.handle_command(cmd_split[0].lower(), 
                                      cmd_split[1:], message, client)
            except:
                print("Error while handling message", flush=True)
                raise

    @client.event
    async def on_guild_join(guild):
        print(f"Added to {guild.name} ({guild.id})")
        defaultChannel = guild.system_channel
        if defaultChannel != "None":
            await defaultChannel.send(f"Hi!, My name is Rankbot. My default prefix is `{settings.COMMAND_PREFIX}` .\nTo change my prefix, use `{settings.COMMAND_PREFIX}prefix change <new prefix>`. To get help, use `{settings.COMMAND_PREFIX}help`.")
        with open('prefix.json', 'r') as f: 
            prefixes = json.load(f) 
        prefixes[str(guild.id)] = settings.COMMAND_PREFIX
        with open('prefix.json', 'w') as f: 
            json.dump(prefixes, f, indent=4)
        

    @client.event
    async def on_guild_remove(guild): 
        print(f"Removed from {guild.name} ({guild.id})")
        with open('prefix.json', 'r') as f: 
            prefixes = json.load(f)
        prefixes.pop(str(guild.id))
        with open('prefix.json', 'w') as f: 
            json.dump(prefixes, f, indent=4)

    @client.event
    async def on_message(message):
        await common_handle_message(message)

    @client.event
    async def on_message_edit(before, after):
        await common_handle_message(after)

    # Finally, set the bot running
    client.run(settings.BOT_TOKEN)

###############################################################################


if __name__ == "__main__":
    main()
