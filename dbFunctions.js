const fs = require ('fs')
function readDb(dbName = 'escapeRoom.json'){
    const data = fs.readFileSysnc(dbName,'utf-8')
    return JSON.parse(data)
}
function writeDb (obj, dbName = 'escapeRoom.json'){
    if (!obj){return console.log ('please provide data')

    }
    try{
        fs.writeFileSync(dbName, JSON.stringify(obj))
        return console.log('successful saved')
    }
    catch(err){
        return console.log('save failed ')
    }
}
module.exports = {readDb,writeDb}