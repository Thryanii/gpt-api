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
      "status": "ok",
      "message": "hi..."
    }
### 失败
    {
      "status": "err",
      "err": "api错误..",
    }
## Key
用的gpt-turbo-3.5  
所有key放在./keys.txt中，如

    sk-ila****************************************tZu6v
    sk-ydB****************************************7WO8K
    sk-Jwf****************************************ReGIr
    sk-VOv****************************************WS2Ua
    sk-QOJ****************************************4dUCn
    
### action
针对keys.txt操作的接口
#### get

    curl "127.0.0.1:3000/keys" \
      -H "Content-Type: application/json" \
      -d '{"action": "get"}'

返回

    {
      "status": "ok",
      "keys": ["sk-xxx","sk-xxx"]
    }

    {
      "status": "err",
      "err": "参数请求错误"
    }
#### check
    curl "127.0.0.1:3000/keys" \
      -H "Content-Type: application/json" \
      -d '{"action": "check", "key":"sk-xxx" }'

返回值

    {
      "status": "ok",
      "data": {
        "total":5.00,
        "balance":4.23,
        "used":0.77
      }
    }

    {
      "status": "err",
      "err": "xxx"
    }
#### add/del
    curl "127.0.0.1:3000/keys" \
      -H "Content-Type: application/json" \
      -d '{"action": "add/del", "key":"sk-xxx" }'

add或delete可选,返回值

    {
      "status": "ok",
    }

    {
      "status": "err",
      "err": "has been included/not find"
    }