const request = require('request')
const chat = require('./chat.js')
const util = require('./util.js')
const express = require('express')
const app = express();

//const proxy = 'http://165.154.243.62:3888'
const proxy = 'http://127.0.0.1:7890'
let keys = ["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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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"]

app.use(express.json());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next()
})
/**
 * @type {{id:number,msgs:{role:string,content:string}[]}[]}
 */
let list = []
//[
//  {id:111,msg:[{},{}]}
//]

app.post('/withContext', async (req, res) => {
    if (req.body.message == undefined || req.body.id == undefined) {
        res.end("数据请求错误")
        return;
    }
    console.log("context id:" + req.body.id + "; " + req.body.message)
    let key = keys[0]
    let item = util.findById(req.body.id)
    let re = await chat.sendMessageContext(key, msgs, req.body.message)
    res.end(msgs[msgs.length - 1].content)
});
app.post('/', async (req, res) => {
    if (req.body.message == undefined) {
        res.end("数据请求错误")
        return;
    }
    console.log("single " + req.body.message)
    let key = keys[0]
    let re = await chat.sendMessageSingle(key, req.body.message)
        .then(res => {
            let responseMsg = res.choices[0].message
            return responseMsg.content
        })
        .catch(err => {
            if (err instanceof String && err.includes("Incorrect API key")) {
                return "api失效 " + key
            } else {
                return "未知错误" + err
            }
        })
    res.end(re)
});

app.listen(3000, () => {
    console.log('running on 3000');
});