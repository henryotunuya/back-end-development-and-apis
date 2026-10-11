
function getUpperCase(arg){
    return arg.toUpperCase()
}

function getLowerCase(arg){
    return arg.toLowerCase()
}

function getSentenceCase(arg){
    return arg[0].toUpperCase().concat(arg.substr(1).toLowerCase())
}

function getProperCase(arg){
    let output = ""
    str_split = arg.split(" ")
    for (let str of str_split){
        str_p = getSentenceCase(str).concat(" ")
        output += str_p
    }
    return output.trim()
}

module.exports = {
    getUpperCase,
    getLowerCase,
    getSentenceCase,
    getProperCase,
};