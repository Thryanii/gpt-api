const utils = require('./util.js')
const fs = require('fs');

let keys
const initKeys = () => {
    const fileContent = fs.readFileSync('keys.txt', 'utf8')
    return fileContent.split('\n')
}
const getKey = () => utils.randomArray(keys)

//初始化所有接口
keys = initKeys()
module.exports = { getKey }