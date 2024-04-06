import { valImgCdnBaseUrl, apexImgCdnBaseUrl } from "../config"

const getValRankImgLink = (tier: number) => {
    return `${valImgCdnBaseUrl}/${tier.toString()}.png`
}

const getApexRankImgLink = (rankName: string, rankDiv: number) => {
    const x = `${rankName.toLowerCase()}${rankDiv.toString()}`
    let y = x.replace(" ", "")
    return `${apexImgCdnBaseUrl}/${y}.png`
}

export { getValRankImgLink, getApexRankImgLink }