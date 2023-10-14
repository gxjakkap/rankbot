const getValRankColor = (rank) => {
    if (rank<=5){return [55, 56, 56]} //iron 
    else if (rank<=8){return [144, 113, 73]} //bronze   
    else if (rank<=11){return [149, 160, 172]} //silver
    else if (rank<=14){return [215, 137, 40]} //gold
    else if (rank<=17){return [52, 143, 157]} //plat
    else if (rank<=20){return [195, 111, 215]} //diamond
    else if (rank<=23){return [60, 179, 120]} //ascendant
    else if (rank<=26){return [190, 50, 77]} //immortal   
    else if (rank==27){return [244, 237, 181]} //radiant 
    else{return [147, 181, 198]} //default color
}

const getApexRankColor = (rank) => {
    const ApexRankColor = {
        "Rookie": [128,108,89],
        "Bronze": [113, 75, 51],
        "Silver": [107, 106, 108],
        "Gold": [154, 123, 67],
        "Platinum": [111, 187, 205],
        "Diamond": [88, 147, 193],
        "Master": [157, 102, 209],
        "Apex Predator": [152, 0, 0],
    }
    return ApexRankColor[rank] || [147, 181, 198]
}

module.exports = {getValRankColor, getApexRankColor}