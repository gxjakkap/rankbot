def getvalrankpic(rank):
    rankPic = {
  "3": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_3.png",
  "4": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_4.png",
  "5": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_5.png",
  "6": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_6.png",
  "7": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_7.png",
  "8": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_8.png",
  "9": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_9.png",
  "10": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_10.png",
  "11": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_11.png",
  "12": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_12.png",
  "13": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_13.png",
  "14": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_14.png",
  "15": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_15.png",
  "16": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_16.png",
  "17": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_17.png",
  "18": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_18.png",
  "19": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_19.png",
  "20": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_20.png",
  "21": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_21.png",
  "22": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_22.png",
  "23": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_23.png",
  "24": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/TX_CompetitiveTier_Large_24.png"
    }
    rank = str(rank)
    return rankPic[rank]

def getapexrankpic(rankname, rankdiv):
    x = str(rankname.lower()+str(rankdiv))
    dict = {
  "bronze1": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/bronze1.png",
  "bronze2": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/bronze2.png",
  "bronze3": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/bronze3.png",
  "bronze4": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/bronze4.png",
  "silver1": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/silver1.png",
  "silver2": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/silver2.png",
  "silver3": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/silver3.png",
  "silver4": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/silver4.png",
  "gold1": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/gold1.png",
  "gold2": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/gold2.png",
  "gold3": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/gold3.png",
  "gold4": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/gold4.png",
  "platinum1": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/platinum1.png",
  "platinum2": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/platinum2.png",
  "platinum3": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/platinum3.png",
  "platinum4": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/platinum4.png",
  "diamond1": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/diamond1.png",
  "diamond2": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/diamond2.png",
  "diamond3": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/diamond3.png",
  "diamond4": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/diamond4.png",
  "master1": "https://cdn.statically.io/img/raw.githubusercontent.com/w=120,h=120/gxjakkap/rankbot-img/main/img/master.png",
  "apexpredator0": "https://cdn.statically.io/gh/gxjakkap/rankbot-img/main/img/apexpred.png"
    }
    try:
        ans = dict[x]
        return ans
    except:
        return "https://cdn.statically.io/og/theme=dark/404%20Not%20Found.jpg"

def spl(x):
    return [char for char in x]