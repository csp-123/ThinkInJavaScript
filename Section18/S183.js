/**
 * 18.3 基于服务器端推送事件的Comet技术
 */
var ticker = new EventSource("stockprices.php");
ticker.onmessage = function(e) {
	var type = e.type;
	var data = e.data;
	// 现在处理事件类型和事件的字符串数据
}

/**
 * 使用EventSource的简易聊天客户端
 */
// 注意一些UI细节
var nick = prompt("Enter your nickname");
var input = document.getElementById("input");
input.focus();

// 通过EventSource注册新消息的通知
var chat = new EventSource("/chat");
chat.onmessage = function(event) { // 当捕获一条消息时
	var msg = event.data;
	var node = document.createTextNode(msg);
	var div = document.createElement("div");
	div.appendChild(node);
	document.body.insertBefore(div, input);
	input.scrollIntoView();
}

// 通过XMLHttpRequest把用户消息发送给服务器
input.onchange = function() {
	var msg = nick + ": " + input.value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/chat");
	xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	xhr.send(msg);
	input.value = "";
}