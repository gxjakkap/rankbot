const { valImgCdnBaseUrl, apexImgCdnBaseUrl } = require("../config.json")

const getValRankImgLink = (tier) => {
    return `${valImgCdnBaseUrl}/${tier}.png`
}

const getApexRankImgLink = (rankName, rankDiv) => {
    const x = `${rankName.toLowerCase()}${rankDiv.toString()}`
    let y = x.replace(" ", "")

    if (y.includes("rookie")){ // all rookie rank will use the same asset file
        y = "rookie4"
    }

    return `${apexImgCdnBaseUrl}/${y}.png`
}

module.exports = {getValRankImgLink, getApexRankImgLink}