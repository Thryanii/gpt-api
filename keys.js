const utils = require('./util.js')
const fs = require('fs');
const request = require('request')

/**
 * @type {string[]}
 */
let keys
const updateKeys = () => {
    const fileContent = fs.readFileSync('./keys.txt', 'utf8')
    keys = fileContent.split(/\r\n|(?<!\r\n)\n(?!\r\n)|(?<!\r\n|\n)\r(?!\r\n|\n)/).filter(item => item != '')
    return keys
}
const getKeys = () => keys
const getKey = () => utils.randomArray(keys)
const deleteKey = (key) => {
    let newKeys = ''
    keys.forEach(item => {
        if (item != key) newKeys += item + '\n'
    })
    fs.writeFileSync('./keys.txt', newKeys, 'utf8')
    updateKeys()
}
const addKey = (key) => {
    let newKeys = ''
    keys.forEach(item => newKeys += item + '\n')
    newKeys += key
    fs.writeFileSync('./keys.txt', newKeys, 'utf8')
    updateKeys()
}

//You exceeded your current quota
const getSummary = async (key) => {
    let promise = new Promise((resolve, reject) => {
        request('https://api.openai-proxy.com/pro/balance?apiKey=' + key, (err, res, body) => {
            if (err) {
                reject(err)
            } else {
                resolve(body)
            }
        })
    })
    return await promise
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
}

//初始化所有接口
updateKeys()

module.exports = { getKey, getKeys, updateKeys, getSummary, addKey, deleteKey }