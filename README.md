# Rankbot

Discord bot for querying rank for VALORANT and Apex Legends player. Utilizing [mozambiquehe.re](https://apexlegendsapi.com/) and [henrikdev.xyz](https://docs.henrikdev.xyz/valorant.html) API.

## Requirements
1. Python 3

2. Modules listed in requirements.txt 

## Installation

1. Get Discord bot token from [Discord Developer Portal](https://discord.com/developers/applications) (You should know how to do it by now.)

2. Clone this repository 

3. Fill details in settings.py

   ![Fill details in settings.py](https://i.ibb.co/swH8tSB/Screenshot-64.png)

4. Install required modules via `pip install -r requirements.txt`

5. Run your_bot.py

## Commands

### VALORANT

1. valrank `region` `ign with tagline`

Returns player's rank. 

   `region` account's region. Allowed regions: AP, NA, EU, KR (use NA for LATAM and BR)

   `ign with tagline` player's ign with tagline. e.g. MilkChocolate#1011

Example:

   ![example](https://i.ibb.co/D4gGKXh/Screenshot-65.png) 

2. apvalrank `ign with tagline`

   `ign with tagline` APAC player's ign with tagline.

Example:

   ![example](https://i.ibb.co/ftYDGb3/Screenshot-66.png)

3. krvalrank `ign with tagline`

   `ign with tagline` KR player's ign with tagline.

Example:

   ![example](https://i.ibb.co/FwXTnJW/Screenshot-67.png)

4. euvalrank `ign with tagline`

   `ign with tagline` EU player's ign with tagline.

Example:

   ![example](https://i.ibb.co/cQQNCQd/Screenshot-68.png)

5. navalrank `ign with tagline`

   `ign with tagline` NA player's ign with tagline.

Example:

   ![nice](https://i.ibb.co/WzN9V0L/Screenshot-69.png)


### Apex Legends

1. apexrank `origin id`

Returns rank for Origin id requested. for PC player.
   `origin id` player's Origin username. e.g. flyaway1214

Example: 
   ![example](https://i.ibb.co/pjXcmQ0/Screenshot-70.png)

2. psapexrank `psn id`

Returns rank for PSN id requested. for Playstation player.
   `psn id` player's Playstation Network name.


## Known bugs

- Apex Predator rank does not return rank icon.
- krvalrank fails to return rank data for players with korean name.
