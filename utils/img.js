const { valImgCdnBaseUrl, apexImgCdnBaseUrl } = require("../config.json")

const getValRankImgLink = (tier) => {
    return `${valImgCdnBaseUrl}/${tier}.png`
}

const getApexRankImgLink = (rankName, rankDiv) => {
    const x = `${rankName.toLowerCase()}${rankDiv.toString()}`
    const y = x.replace(" ", "")
    return `${apexImgCdnBaseUrl}/${y}.png`
}

module.exports = {getValRankImgLink, getApexRankImgLink}