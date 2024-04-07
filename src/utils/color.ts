type RGBArray = [number, number, number]

interface ApexRankColorDict {
    [rank: string]: RGBArray
}

const getValRankColor = (rank: number) => {
    if (rank<=5) return [55, 56, 56] as RGBArray //iron 
    else if (rank<=8) return [144, 113, 73] as RGBArray //bronze   
    else if (rank<=11) return [149, 160, 172] as RGBArray //silver
    else if (rank<=14) return [215, 137, 40] as RGBArray //gold
    else if (rank<=17) return [52, 143, 157] as RGBArray //plat
    else if (rank<=20) return [195, 111, 215] as RGBArray //diamond
    else if (rank<=23) return [60, 179, 120] as RGBArray //ascendant
    else if (rank<=26) return [190, 50, 77] as RGBArray //immortal   
    else if (rank==27) return [244, 237, 181] as RGBArray //radiant 
    else return [147, 181, 198] as RGBArray //default color
}

const getApexRankColor = (rank: string) => {
    const ApexRankColor: ApexRankColorDict = {
        "Rookie": [128,108,89],
        "Bronze": [113, 75, 51],
        "Silver": [107, 106, 108],
        "Gold": [154, 123, 67],
        "Platinum": [111, 187, 205],
        "Diamond": [88, 147, 193],
        "Master": [157, 102, 209],
        "Apex Predator": [152, 0, 0],
    }
    return ApexRankColor[rank] || [147, 181, 198] as RGBArray
}

export { getValRankColor, getApexRankColor }