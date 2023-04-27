const request = require('request')
const chat = require('./chat.js')
const utils = require('./util.js')
const keys = require('./keys.js')
const express = require('express')

const app = express();

app.use(express.json());
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") res.send(200);
    else next()
})

/**
 * @type {{id:number,msgs:{role:string,content:string}[]}[]}
 */
let list = []

app.post('/withContext', async (req, res) => {
    if (req.body.message == undefined || req.body.id == undefined) {
        res.json({ "status message": "err", "err": "数据请求错误" })
        return;
    }
    let id = req.body.id
    console.log("context id:" + id + "; ")
    let info
    if(req.body.info != undefined && req.body.info!="nothing"){
        console.log("chat with Info("+ req.body.info +") " + req.body.message)
        info = req.body.info
    }
    else console.log("chat " + req.body.message)

    let key = keys.getKey()
    let item = utils.findById(list, id)
    let re = await chat.sendMessageContext(key, item.msgs, req.body.message, info)
    console.log(re)
    res.json(re)
});

app.post('/', async (req, res) => {
    if (req.body.message == undefined) {
        res.json({ "status message": "err", "err": "数据请求错误" })
        return;
    }
    let messages = []
    if(req.body.info != undefined && req.body.info!="nothing"){
        console.log("single with Info("+ req.body.info +") " + req.body.message)
        messages.push({role: "user", content: req.body.info})
    }
    else console.log("single " + req.body.message)
    messages.push({role: "user", content: req.body.message})
    let key = keys.getKey()
    let re = await chat.sendMessageJSON(key, messages)
        .then(res => {
            let responseMsg = res.choices[0].message
            return { "status message": "ok", "message": responseMsg }
        })
        .catch(err => {
            return { "status message": "err", "err": err }
        })
    console.log(re)
    res.json(re)
});

app.listen(3000, () => {
    console.log('running on 3000');
});