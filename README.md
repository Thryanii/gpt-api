# gpt-api
支持上下文和单次调用
## 使用
### 单次对话
    curl "127.0.0.1:3000/" \
      -H "Content-Type: application/json" \
      -d '{"message": "hi", "info":"(可选)" }'
### 上下文
    curl "127.0.0.1:3000/withContext" \
      -H "Content-Type: application/json" \
      -d '{"message": "hi", "id":"12345", "info":"(可选)" }'
## 返回值
### 成功
    {
      "status message": "ok",
      "message": "hi...",
      "error": "",
    }
### 失败
    {
      "status message": "err",
      "message": "",
      "error": "api错误..",
    }
## Key
用的gpt-turbo-3.5  
所有key放在./keys.txt中，如

    sk-ila****************************************tZu6v
    sk-ydB****************************************7WO8K
    sk-Jwf****************************************ReGIr
    sk-VOv****************************************WS2Ua
    sk-QOJ****************************************4dUCn
    
