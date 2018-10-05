/**
 * 9.6 JavaScript中的面向对象技术
 * 9.6.1 一个例子: 集合类
 */
function Set() { // 这是一个构造函数
	this.values = {}; // 集合数据保存在对象的属性里
	this.n = 0; // 集合中的值的个数
	this.add.apply(this, arguments); // 把所有参数都添加进这个集合
}

// 将每个参数都添加进这个集合
Set.prototype.add = function () {
	for (var i = 0; i < arguments.length; i++) {
		var val = arguments[i];
		var str = Set._v2s(val); // 把它转换成字符串
		if(!this.values.hasOwnProperty(str)) { // 如果不在集合中
			this.values[str] = val;
			this.n++;
		}
	}
	return this;
}

// 从集合删除元素 这些元素由参数决定
Set.prototype.remove = function() {
	for (var i = 0; i < arguments.length; i++) {
		var str = Set.v2s(arguments[i]);
		if(this.values.hasOwnProperty(str)) {
			delete this.values[str];
			this.n--;
		} 
	}
	return this;
}

// 如果集合中包含这个值, 则返回true, 否则返回false
Set.prototype.contains = function (value) {
	return this.values.hasOwnProperty(Set._v2s(value));
}

// 返回集合的大小
Set.prototype.size = function() {
	return this.n;
}

// 遍历集合中的所有元素, 在指定的上下文中调用f
Set.prototype.foreach = function(f, context) {
	for (var s in this.values)
		if (this.values.hasOwnProperty(s)) {
			f.call(context, this.values[s]);
		}
}

// 这是一个内部函数 用以将任意JavaScript值和唯一的字符串对象起来
Set._v2s = function(val) {
	switch (val) {
		case undefined: return 'u';
		case null: return 'n';
		case true: return 't';
		case false: return 'f';
		default: switch(typeof val) {
			case 'number': return '#' + val;
			case 'string': return '"' + val;
			default: return '@' + objectId(val);
		}
	}

	function objectId(o) {
		var prop = "|**objectid**|"; // 私有属性, 用以存放ID
		if (!o.hasOwnProperty(prop)) {
			o[prop] = Set._v2s.next++;
		}
		return o[prop];
	}
};
Set._v2s.next = 100; // 设置初始ID值