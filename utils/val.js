exports.processRiotTags = (input) => {
    let inputString = input.toString()
    if (!inputString.includes("#") || ((inputString.match(/,/g) || []).length > 1)){return null}
    let rtagArr = inputString.split("#")
    if (rtagArr.length > 2){return null}
    return {"name": rtagArr[0], "tag": rtagArr[1]}
}
