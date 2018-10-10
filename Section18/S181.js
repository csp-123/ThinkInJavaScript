/**
 * 18.1 使用XMLHttpRequest
 * 用POST发送纯文本给服务器
 */
function postMessage(msg) {
	var request = new XMLHttpRequest(); // 新请求
	request.open("POST", "/log.php"); // 用POST向服务器发送脚本
	// 用请求主体发送纯文本消息
	request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"); // 请求主体将是纯文本
	request.send(msg); // 把msg作为请求主体发送
	// 请求完成，我们将忽略任何响应和任何错误
}

// 获取HTTP响应的onreadystatechange
// 发出一个HTTP GET请求以获得指定URL的内容
// 当响应成功到达，验证它是否是纯文本
// 如果是，把它传递给指定的回调函数
function getText(url, callback) {
	var request = new XMLHttpRequest(); // 创建新请求
	request.open("GET", url); // 指定待获取的URL
	request.onreadystatechange = function(){ // 定义事件处理程序
		// 如果请求成功，则它是成功
		if(request.readyState === 4 && request.status === 200) {
			var type = request.getResponseHeader("Content-Type");
			if (type.match(/^text/)) { // 确保响应的是文本
				callback(request.responseText); // 把它传递给回调函数
			}
		}
	};
	request.send(null); // 立即发送请求
}

// 发起同步的HTTP GET请求以获得指定的URL的内容
// 返回响应文本，或如果请求不成功或响应不是文本就报错
function getTextSync(url) {
	var request = new XMLHttpRequest(); // 创建新请求
	request.open("GET", url, false); // 传递false实现同步
	request.send(null); // 立即发送请求

	// 如果请求不是200 OK，就报错
	if(request.status !== 200) throw new Error(request.statusText);

	// 如果类型错误就报错
	var type = request.getResponseHeader("Content-Type");
	if(!type.match(/^text/))
		throw new Error(type);

	return request.responseText;
}

// 发起HTTP GET响应以获得指定URL内容
// 当响应到达时，把它解析后的XML Document对象、解析后的JSON对象
// 或字符串传递给回调函数
function get(url, callback) {
	var request = new XMLHttpRequest(); // 创建新请求
	request.open("GET", url); // 指定待获取的URL
	request.onreadystatechange = function() { // 定义事件监听器
		// 如果请求完成且成功
		var type = request.getResponseHeader("Content-Type");
		// 检查类型，这样我们不能在将来得到HTML文档
		if(type.indexOf("xml") !== -1 && request.responseText) {
			callback(request.responseText); // Document对象响应
		} else if(type === "application/json") {
			callback(JSON.parse(request.responseText)); // JSON响应
		} else {
			callback(request.responseText);
		}
	};
	request.send(null);
}

/**
 * 用于Http请求的编码对象
 * 编码对象的属性，
 * 如果他们是来自HTML表单的名/值对，使用application/x-www-form-urlencoded格式
 */
function encodeFormData(data) {
	if(!data) return "";
	var pairs = [];
	for(var name in data) {
		if(!data.hasOwnProperty(name)) {
			continue; // 跳过继承属性
		}
		if(typeof data[name] === "function") {
			continue; // 跳过方法
		}
		var value = data[name].toString(); // 把值转换为字符串
		name = encodeURIComponent(name.replace("%20", "+")); // 编码名字
		value = encodeURIComponent(value.replace("%20", "+")); // 编码值
		pairs.push(name + "=" + value); // 记住名=值对
	}
	return pairs.join("&"); // 返回使用“&”连接的名/值对
}

/**
 * 使用编码表单数据发送POST请求
 */
function postData(url, data, callback) {
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function() {
		if(request.readyState === 4 && callback)
			callback(request);
	};
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(encodeFormData(data));
}

/**
 * 使用表单编码数据发送GET请求
 */
function getData(url, data, callback){
	var request = new XMLHttpRequest();
	request.open("GET", url + "?" + encodeFormData(data));
	request.onreadystatechange = function() {
		if(request.readyState === 4 && callback)
			callback(request);
	};
	request.send(null);
}

/**
 * 使用JSON编码主体来发起HTTP POST请求
 */
function postJSON(url, data, callback) {
	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function(){
		if (request.readyState === 4 && callback) {
			callback(request);
		}
	};
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(data));
}

/**
 * 使用HTTP POST请求上传文件
 * 查找有data-uoloadto属性的全部<input type="file">元素
 * 并注册onchange事件处理程序
 * 这样任何选择的文件都会自动通过POST方法发送送到指定“uploadto” URL
 * 服务器的响应是忽略
 */
whenReady(function(){ // 当文档准备就绪时运行
	var elts = document.getElementsByTagName("input");
	for (var i = 0; i < elts.length; i++) {
		var input = elts[i];
		if(input.type !== "file") continue; // 跳过所有非文件上传元素
		var url = input.getAttribute("data-updateto"); // 获取上传的URL
		if(!url) continue;
		input.addEventListener("change", function() { // 当用户选择文件时
			var file = this.files[0]; // 假设单个文件选择
			if(!file) return; // 如果没有文件，不做任何事情
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url);
			xhr.send(file); // 把文件作为主体发送
		}, false);
	}
});

/**
 * 使用POST方法发送 multipart/form-data 请求主体
 */
function postFormData(url, data, callback) {
	if(typeof FormData === "undefined")
		throw new Error("FormData is not implemented");

	var request = new XMLHttpRequest();
	request.open("POST", url);
	request.onreadystatechange = function() {
		if(request.readyState === 4 && callback)
			callback(request);
	};
	var formdata = new FormData();
	for(var name in data) {
		if(!data.hasOwnProperty(name)) continue;
		var value = data[name];
		if (typeof value === "function") {
			continue;
		}
		// 每个属性变成请求的一部分
		// 这里允许File对象
		formdata.append(name, value); // 作为一部分添加名/值对
	}
	// 在multipart/form-data请求主体中发送名/值对
	// 每对都是请求的一部分， 注意， 当传入FormData对象时
	// send()会自动设置Content_Type头
	request.send(formdata);
}

/**
 * 实现超时
 * 发起HTTP GET请求获取指定URL的内容
 * 如果响应成功到达, 传入responseText给回调函数
 * 如果响应在timeout毫秒内没有到达, 终止这个请求
 * 浏览器可能在abort()后出发"readystatechange"
 * 如果是部分请求结果到达, 甚至可能设置status属性
 * 所以需要设置一个标记, 当部分且超时的响应到达时不会调用回调函数
 * 如果使用load事件就没有这个风险
 */
function timeGetText(url, timeout, callback) {
	var request = new XMLHttpRequest();
	var timeout = false;
	// 启动定时器, 在timeout毫秒后将终止请求
	var timer = setTimeout(function() {
		timeout = true;
		request.abort(); // 终止请求
	}, timeout);
	request.open("GET", url);
	request.onreadystatechange = function() {
		if(request.readyState !== 4) return;
		if(timeout) return;
		clearTimeout(timer);
		if(request.status === 200)
			callback(request.responseText);
	}
	request.send(null);
}

/**
 * 使用script元素发送JSONP请求
 * 根据指定的URL发送一个JSONP请求
 * 然后把解析得到的响应数据传递给回调函数
 * 在URL中添加一个名为jsonp的查询参数, 用于指定该请求的回调函数的名称
 */
function getJSONP(url, callback) {
	// 为本次请求创建一个唯一的回调函数名称
	var cbnum = "cb" + getJSONP.counter++; // 每次自增计数器
	var cbname = "getJSONP." + cbnum; // 作为JSONP函数的属性

	// 将回调函数名称以表单编码的形式添加到URL的查询部分中
	// 使用jsonp作为参数名, 一些支持JSONP的服务
	// 可能使用其他的参数名, 比如callback
	if(url.indexOf("?") === -1)
		url += "?jsonp=" + cbname;
	else
		url += "&jsonp=" + cbname;

	// 创建script元素用于发送请求
	var script = document.createElement("script");

	// 定义将被脚本执行的回调函数
	getJSONP[cbnum] = function(response) {
		try{
			callback(response);
		}
		finally{
			delete getJSONP[cbnum];
			script.parentNode.removeChild(script);
		}
	};
	// 立即触发HTTP请求
	script.src = url;
	document.body.appendChild(script);
}

getJSONP.counter = 0;