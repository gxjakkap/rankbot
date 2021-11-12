# Rankbot

Discord bot for querying rank for VALORANT and Apex Legends player. Utilizing [mozambiquehe.re](https://apexlegendsapi.com/) and [henrikdev.xyz](https://docs.henrikdev.xyz/valorant.html) API.

## Requirements
1. Python 3

2. Modules listed in requirements.txt 

## Installation

*for in depth installation guide, see [wiki](https://github.com/gxjakkap/rankbot/wiki/Installation)*

1. Get Discord bot token from [Discord Developer Portal](https://discord.com/developers/applications) (You should know how to do it by now.)

2. Clone this repository 

3. Fill details in settings.py

   ![Fill details in settings.py](https://i.ibb.co/swH8tSB/Screenshot-64.png)
   
4. Install virtualenv and activate it. follow steps [here](https://docs.python-guide.org/dev/virtualenvs/#lower-level-virtualenv).

4. Install required modules via `pip install -r requirements.txt`

5. Run bot.py

## Commands

See [wiki](https://github.com/gxjakkap/rankbot/wiki).

## Known bugs

- krvalrank fails to return rank data for players with korean name.
