def getrvalrankpic(rank):
    rankPic = {
  "3": "img/TX_CompetitiveTier_Large_3.png",
  "4": "img/TX_CompetitiveTier_Large_4.png",
  "5": "img/TX_CompetitiveTier_Large_5.png",
  "6": "img/TX_CompetitiveTier_Large_6.png",
  "7": "img/TX_CompetitiveTier_Large_7.png",
  "8": "img/TX_CompetitiveTier_Large_8.png",
  "9": "img/TX_CompetitiveTier_Large_9.png",
  "10": "img/TX_CompetitiveTier_Large_10.png",
  "11": "img/TX_CompetitiveTier_Large_11.png",
  "12": "img/TX_CompetitiveTier_Large_12.png",
  "13": "img/TX_CompetitiveTier_Large_13.png",
  "14": "img/TX_CompetitiveTier_Large_14.png",
  "15": "img/TX_CompetitiveTier_Large_15.png",
  "16": "img/TX_CompetitiveTier_Large_16.png",
  "17": "img/TX_CompetitiveTier_Large_17.png",
  "18": "img/TX_CompetitiveTier_Large_18.png",
  "19": "img/TX_CompetitiveTier_Large_19.png",
  "20": "img/TX_CompetitiveTier_Large_20.png",
  "21": "img/TX_CompetitiveTier_Large_21.png",
  "22": "img/TX_CompetitiveTier_Large_22.png",
  "23": "img/TX_CompetitiveTier_Large_23.png",
  "24": "img/TX_CompetitiveTier_Large_24.png"
    }
    rank = str(rank)
    return rankPic[rank]

def getapexrankpic(rankname, rankdiv):
    x = str(rankname.lower()+str(rankdiv))
    dict = {
  "bronze1": "img/bronze1.png",
  "bronze2": "img/bronze2.png",
  "bronze3": "img/bronze3.png",
  "bronze4": "img/bronze4.png",
  "silver1": "img/silver1.png",
  "silver2": "img/silver2.png",
  "silver3": "img/silver3.png",
  "silver4": "img/silver4.png",
  "gold1": "img/gold1.png",
  "gold2": "img/gold2.png",
  "gold3": "img/gold3.png",
  "gold4": "img/gold4.png",
  "platinum1": "img/platinum1.png",
  "platinum2": "img/platinum2.png",
  "platinum3": "img/platinum3.png",
  "platinum4": "img/platinum4.png",
  "diamond1": "img/diamond1.png",
  "diamond2": "img/diamond2.png",
  "diamond3": "img/diamond3.png",
  "diamond4": "img/diamond4.png",
  "master": "img/master.png"
    }
    #return dict[x]
    try:
        ans = dict[x]
        return ans
    except:
        return 'img/apexpred.png'

def spl(x):
    return [char for char in x]