def getvalrankpic(rank):
    rankPic = {
  "0": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_0.png",
  "3": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_3.png",
  "4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_4.png",
  "5": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_5.png",
  "6": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_6.png",
  "7": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_7.png",
  "8": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_8.png",
  "9": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_9.png",
  "10": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_10.png",
  "11": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_11.png",
  "12": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_12.png",
  "13": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_13.png",
  "14": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_14.png",
  "15": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_15.png",
  "16": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_16.png",
  "17": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_17.png",
  "18": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_18.png",
  "19": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_19.png",
  "20": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_20.png",
  "21": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_21.png",
  "22": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_22.png",
  "23": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_23.png",
  "24": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/val/TX_CompetitiveTier_Large_24.png"
    }
    rank = str(rank)
    try:
        ans = rankPic[rank]
        return ans
    except:
        return "https://cdn.statically.io/og/theme=dark/404%20Not%20Found.jpg"

def getapexrankpic(rankname, rankdiv):
    x = str(rankname.lower()+str(rankdiv))
    y = x.replace(" ", "")
    rankPic = {
    "unranked4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/unranked4.png",
  "bronze1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/bronze1.png",
  "bronze2": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/bronze2.png",
  "bronze3": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/bronze3.png",
  "bronze4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/bronze4.png",
  "silver1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/silver1.png",
  "silver2": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/silver2.png",
  "silver3": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/silver3.png",
  "silver4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/silver4.png",
  "gold1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/gold1.png",
  "gold2": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/gold2.png",
  "gold3": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/gold3.png",
  "gold4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/gold4.png",
  "platinum1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/platinum1.png",
  "platinum2": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/platinum2.png",
  "platinum3": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/platinum3.png",
  "platinum4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/platinum4.png",
  "diamond1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/diamond1.png",
  "diamond2": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/diamond2.png",
  "diamond3": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/diamond3.png",
  "diamond4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/diamond4.png",
  "master1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/master.png",
  "apexpredator0": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/apex/apexpred.png"
    }
    try:
        ans = rankPic[y]
        return ans
    except:
        return "https://cdn.statically.io/og/theme=dark/404%20Not%20Found.jpg"

def getapexplatpic(plat):
    x = str(plat.lower())
    platPic = {
  "pc": "https://cdn.statically.io/img/raw.githubusercontent.com/w=30,h=30/gxjakkap/rankbot-img/main/img/apex/windows.png",
  "x1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=30,h=30/gxjakkap/rankbot-img/main/img/apex/xbox.png",
  "ps4": "https://cdn.statically.io/img/raw.githubusercontent.com/w=30,h=30/gxjakkap/rankbot-img/main/img/apex/playstation.png"
    }
    try:
        ans = platPic[x]
        return ans
    except:
        return "https://cdn.statically.io/og/theme=dark/404%20Not%20Found.jpg"

def spl(x):
    return [char for char in x]

def getvalrankcolor(rank):
    if rank<=5: #iron
        return [55, 56, 56]
    elif rank<=8: #bronze
        return [144, 113, 73]
    elif rank<=11: #silver
        return [149, 160, 172]
    elif rank<=14: #gold
        return [215, 137, 40]
    elif rank<=17: #plat
        return [52, 143, 157]
    elif rank<=20: #diamond
        return [195, 111, 215]
    elif rank<=23: #immortal
        return [190, 50, 77]
    elif rank==24: #radiant
        return [244, 237, 181]
    else: #default color
        return [147, 181, 198]

def getapexrankcolor(rank):
    if rank=="Bronze":
        return [113,75,51]
    elif rank=="Silver":
        return [107,106,108]
    elif rank=="Gold":
        return [154,123,67]
    elif rank=="Platinum":
        return [111,187,205]
    elif rank=="Diamond":
        return [88,147,193]
    elif rank=="Master":
        return [157,102,209]
    elif rank=="Apex Predator":
        return [152, 0, 0]
    else: #default color
        return [147, 181, 198]

def getprefix(gid):
    with open ('prefix.json', 'r') as f:
        import json
        prefix = json.load(f)
    return prefix[str(gid)]

def getvalmapname(x):
    dict = {
  "/Game/Maps/Ascent/Ascent": "Ascent",
  "/Game/Maps/Foxtrot/Foxtrot": "Breeze",
  "/Game/Maps/Bonsai/Bonsai": "Split",
  "/Game/Maps/Duality/Duality": "Bind",
  "/Game/Maps/Triad/Triad": "Haven",
  "/Game/Maps/Port/Port": "Icebox",
  "/Game/Maps/Canyon/Canyon": "Fracture"
    }   
    try:
        reply = dict[x]
    except:
        reply = x
    return reply

def getvalmappic(x):
    dict = {
  "/Game/Maps/Ascent/Ascent": "https://cdn.statically.io/img/raw.githubusercontent.com/w=300/gxjakkap/rankbot-img/main/img/val/maps/Ascent.png",
  "/Game/Maps/Foxtrot/Foxtrot": "https://cdn.statically.io/img/raw.githubusercontent.com/w=300/gxjakkap/rankbot-img/main/img/val/maps/Breeze.png",
  "/Game/Maps/Bonsai/Bonsai": "https://cdn.statically.io/img/raw.githubusercontent.com/w=300/gxjakkap/rankbot-img/main/img/val/maps/Split.png",
  "/Game/Maps/Duality/Duality": "https://cdn.statically.io/img/raw.githubusercontent.com/w=300/gxjakkap/rankbot-img/main/img/val/maps/Bind.png",
  "/Game/Maps/Triad/Triad": "https://cdn.statically.io/img/raw.githubusercontent.com/w=300/gxjakkap/rankbot-img/main/img/val/maps/Haven.png",
  "/Game/Maps/Port/Port": "https://cdn.statically.io/img/raw.githubusercontent.com/w=300/gxjakkap/rankbot-img/main/img/val/maps/Icebox.png",
  "/Game/Maps/Canyon/Canyon": "https://cdn.statically.io/img/raw.githubusercontent.com/w=300/gxjakkap/rankbot-img/main/img/val/maps/Fracture.png"
    }
    try:
        reply = dict[x]
    except:
        reply = "https://cdn.statically.io/og/theme=dark/404%20Not%20Found.jpg"
    return reply