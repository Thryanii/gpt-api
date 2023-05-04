const request = require('request')

/**
 * @type {function (string, string): Promise} 
 */
const sendMessageSingle = async (key, msg) => await new Promise((resolve, reject) => {
    let options = {
        method: "POST",
        json: true,
        timeout: 60000,
        headers: {
            "Authorization": "Bearer " + key
        },
        body: {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: msg }]
        }
    }
    request('https://api.openai-proxy.com/v1/chat/completions', options, (err, res, body) => {
        if (err) {
            reject(err)
        } else {
            if (body.error != undefined) reject(body.error.message)
            resolve(body)
        }
    })

})

const sendMessageJSON = async (key, msg) => await new Promise((resolve, reject) => {
    let options = {
        method: "POST",
        json: true,
        timeout: 60000,
        headers: {
            "Authorization": "Bearer " + key
        },
        body: {
            model: "gpt-3.5-turbo",
            messages: msg
        }
    }
    console.log(options)
    request('https://api.openai-proxy.com/v1/chat/completions', options, (err, res, body) => {
        if (err) {
            reject(err)
        } else {
            if (body.error != undefined) reject(body.error.message)
            else resolve(body)
        }
    })

})
const sendMessageContext = async (key, msgs, msg, info) => {
    let currentMsg = { role: "user", content: msg }
    let currentMsgs = JSON.parse(JSON.stringify(msgs))
    if(info!=undefined) currentMsgs.push({role: "user", content: info})
    currentMsgs.push(currentMsg)
    let re = await sendMessageJSON(key, currentMsgs)
        .then(res => {
            let responseMsg = res.choices[0].message
            msgs.push(currentMsg)
            msgs.push(responseMsg)
            return { "status": "ok", "message": responseMsg.content }
        })
        .catch(err => {
            if(err.indexOf("Incorrect API key")!=-1) return { "status": "err", "err": "API KEY 失效 " + key }
            return { "status": "err", "err": err+"\nkey:"+key }
        })
    return re
}
//成功
//{
//     id: 'chatcmpl-799j8bSNhUguYPybqBLwuhNjl4WGn',
//     object: 'chat.completion',
//     created: 1682416698,
//     model: 'gpt-3.5-turbo-0301',
//     usage: { prompt_tokens: 10, completion_tokens: 10, total_tokens: 20 },
//     choices: [ { message: 
//            { role: 'assistant', content: 'Hi there! How can I assist you today?' },
//              finish_reason: 'stop', index: 0 } ]
//   }

//失败
//{
// error: {
//     message: 'Incorrect API key provided: sk-fYwRn**************************************UpNx. You can find your API key at https://platform.openai.com/account/api-keys.',
//     type: 'invalid_request_error',
//     param: null,
//     code: 'invalid_api_key'
//   }
// }

module.exports = { sendMessageJSON, sendMessageContext }