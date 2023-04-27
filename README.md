# gpt-api
支持上下文和单次调用
## 使用
### 单次对话
`
curl "127.0.0.1:3000/" \  
  -H "Content-Type: application/json" \  
  -d '{"message": "hi", "info":"(可选)" }'
`
### 上下文
`
curl "127.0.0.1:3000/withContext" \  
  -H "Content-Type: application/json" \  
  -d '{"message": "hi", "id":"12345", "info":"(可选)" }'
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
