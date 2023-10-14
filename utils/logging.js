const commandLogger = (type, guild, user, commands) => {
    console.log(`[${type}][${guild}] ${user}: ${commands}`)
}

const unpackOptions = (options) => {
    let os = ""
    options.forEach(o => {
        os = os + `${o.name}:${o.value} `
    })
    return os.trimEnd()
}

module.exports = { commandLogger, unpackOptions }