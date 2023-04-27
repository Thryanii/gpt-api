# gpt-api
支持上下文和单次调用
## 使用
### 单次对话
`
curl "127.0.0.1:3000/" -H "Content-Type: application/json" -d '{"message": "hi", "info":"(可选)" }'
`
### 上下文
`
curl "127.0.0.1:3000/withContext" -H "Content-Type: application/json" -d '{"message": "hi", "id":"12345", "info":"(可选)" }'
`
## 返回值
### 成功
`
{
    "status message": "ok",
    "message": "hi...",
    "error": "",
}
`
### 失败
`
{
    "status message": "err",
    "message": "",
    "error": "api错误..",
}
`
## Key
用的gpt-turbo-3.5  
所有key放在./keys.txt中，如
`
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<br>
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<br>
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<br>
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<br>
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
`