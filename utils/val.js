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
