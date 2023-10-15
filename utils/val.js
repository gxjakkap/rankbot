exports.processRiotTags = (input) => {
    let inputString = input.toString()

    if (!inputString.includes("#") /* || ((inputString.match(/,/g) || []).length > 1) */){
        return null
    }

    let rtagArr = inputString.split("#")

    if (rtagArr.length > 2){ // if there's more than one #
        return null
    }

    if ((rtagArr[1].length > 5) || (rtagArr[0].length > 16)){ // riot id's limits name length at 16 characters and tag length at 5 characters
        return null
    }

    return {"name": rtagArr[0], "tag": rtagArr[1]}
}
exports.getValRanknameFromCompetitiveTier = (competitiveTier) => {
    const rankDict = {
        1: "Unranked",
        2: "Unranked",
        3: "Iron 1",
        4: "Iron 2",
        5: "Iron 3",
        6: "Bronze 1",
        7: "Bronze 2",
        8: "Bronze 3",
        9: "Silver 1",
        10: "Silver 2",
        11: "Silver 3",
        12: "Gold 1",
        13: "Gold 2",
        14: "Gold 3",
        15: "Platinum 1",
        16: "Platinum 2",
        17: "Platinum 3",
        18: "Diamond 1",
        19: "Diamond 2",
        20: "Diamond 3",
        21: "Ascendant 1",
        22: "Ascendant 2",
        23: "Ascendant 3",
        24: "Immortal 1",
        25: "Immortal 2",
        26: "Immortal 3",
        27: "Radiant",
    }
    return rankDict[competitiveTier]
}

exports.valRegionOptions = [
    { name: 'North America', value: 'na' },
    { name: 'Europe', value: 'eu' },
    { name: 'Asia Pacific', value: 'ap' },
    { name: 'Korea', value: 'kr' },
    { name: 'Brazil', value: 'br' },
    { name: 'Latin America', value: 'latam' }
]