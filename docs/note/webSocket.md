>今天逛牛客，看到有大佬分享说前端面试的时候遇到了关于webSocket的问题，一看自己都没见过这个知识点，赶紧学习一下，在此记录！

WebSocket 是一种网络通信协议，提供了全双工通信渠道，即客户端和服务器可以同时发送和接收数据。这与传统的HTTP请求不同，后者是单向的，客户端发起请求，服务器响应请求。WebSocket 允许服务器主动向客户端发送消息，这使得实时通信成为可能，例如在线聊天应用、实时游戏、股票行情更新等场景。

### WebSocket 的基本概念

1. **连接建立**：客户端通过发送一个HTTP请求来发起WebSocket连接，这个请求中包含特定的头部，表明这是一个WebSocket握手请求。
2. **握手**：服务器接收到请求后，如果支持WebSocket，则响应一个HTTP响应，完成握手过程，建立WebSocket连接。
3. **数据传输**：一旦连接建立，客户端和服务器就可以通过这个连接发送数据。数据可以是文本或二进制格式。
4. **连接关闭**：任何一方都可以关闭WebSocket连接。

### WebSocket 的使用步骤

1. **创建WebSocket实例**：在客户端，首先需要创建一个WebSocket实例，指定服务器的URL。

    ```javascript
    const ws = new WebSocket('ws://example.com/socket');
    ```

2. **处理连接事件**：当WebSocket连接建立时，会触发`open`事件。

    ```javascript
    ws.onopen = function(event) {
      console.log('WebSocket connection opened:', event);
    };
    ```

3. **发送数据**：使用`send`方法向服务器发送数据。

    ```javascript
    ws.send('Hello Server!');
    ```

4. **接收数据**：服务器发送的数据可以通过`message`事件接收。

    ```javascript
    ws.onmessage = function(event) {
      console.log('Message from server:', event.data);
    };
    ```

5. **处理错误和关闭连接**：WebSocket连接可能会遇到错误，或者需要主动关闭。

    ```javascript
    ws.onerror = function(error) {
      console.error('WebSocket Error:', error);
    };
    
    ws.onclose = function(event) {
      console.log('WebSocket connection closed:', event);
    };
    
    // 可以主动关闭连接
    ws.close();
    ```
### 使用nodejs实现一个简单的在线聊天demo。
#### 客户端代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
 <!-- 简单的HTML界面 -->
<textarea id="messageInput" placeholder="Type a message..."></textarea>
<button id="sendButton">Send</button>
<div id="messages"></div>

<script>
  // 绑定按钮点击事件
  document.getElementById('sendButton').addEventListener('click', sendMessage);

  // 创建WebSocket连接
  const ws = new WebSocket('ws://localhost:8080');
  const messageInput = document.getElementById('messageInput');
  const messagesDiv = document.getElementById('messages');
  const sendButton = document.getElementById('sendButton');

  // 连接打开时触发
  ws.onopen = function(event) {
    console.log('Connected to the server');

    // 可以在这里禁用或启用按钮等
    sendButton.disabled = false;
  };

  // 接收到消息时触发
  ws.onmessage = function(event) {
    // 将接收到的消息添加到消息显示区域
    const messageElement = document.createElement('div');
    messageElement.textContent = event.data;
    messagesDiv.appendChild(messageElement);
    // 滚动到消息区域底部
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  // 发送消息的函数
  function sendMessage() {
    if (ws.readyState === WebSocket.OPEN) {
      const message = messageInput.value;
      if (message) { // 确保消息不为空
        ws.send(message);
        
        messageInput.value = ''; // 清空输入框
      }
    } else {
      console.error('WebSocket is not connected. Cannot send message.');
    }
  }

  // 客户端连接错误时触发
  ws.onerror = function(error) {
    console.error('WebSocket error observed:', error);
    // 可以在这里显示错误信息或禁用发送按钮
    sendButton.disabled = true;
  };

  // 客户端关闭连接时触发
  ws.onclose = function(event) {
    console.log('WebSocket connection closed:', event);
    // 可以在这里禁用发送按钮或显示断开连接的信息
    sendButton.disabled = true;
  };
</script>
</body>
</html>
```

#### 服务端代码
（注意要先使用npm install ws命令安装需要的库）
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// 存储所有客户端的集合
const clients = new Set();

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // 将新的客户端WebSocket对象添加到集合中
  clients.add(ws);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', function() {
    console.log('Client disconnected');
    // 从集合中移除客户端
    clients.delete(ws);
  });

  // 可以在这里发送欢迎消息给新连接的客户端
  ws.send('Welcome to the chat!');
});

// 假设我们有一个函数，用来向所有客户端广播消息
function broadcastMessage(message) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 示例：每隔5秒向所有客户端发送当前时间
setInterval(() => {
  const currentTime = new Date().toLocaleTimeString();
  broadcastMessage(`Current time: ${currentTime}`);
}, 5000);
```
#### 实现效果
客户端向服务端发送消息：

![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407202002738.png)
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407202003050.png)
服务端向客户端发送消息：
每隔五秒发送当前的时间
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407202002814.png)
