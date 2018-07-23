/**
 * 8.7 函数属性, 方法和构造函数
 * 8.7.1 length属性
 */
function check(args) {
	var actual = args.length; // 实参的真实个数
	var expected = args.callee.length; // 期望的实参个数
	if (actual !== expected)
		throw Error("expected " + expected + "args; got " + actual);
}

function f1(x, y, z) {
	check(arguments); // 检查实参个数和期望的实参个数是否一致
	return x + y + z;
}

console.log(f1(1, 2, 3));
//console.log(f(1, 2));

/* 8.7.2 prototype属性
每一个函数都包含一个prototype属性, 这个属性是指向一个对象的引用,
这个对象称作 "原型对象" (prototype object)
 */

/* 8.7.3 call()方法和apply()方法
apply()和call()类似, 但传入实参的形式和call()不同, 它的实参都放入一个数组当中
 */
try{
	var o = {};
	f.call(o);
	o.m = f;
	o.m();
	delete o.m;

	f.call(o, 1, 2, 3);
} catch (e) {}

function trace(o, m) {
	var original = o[m];
	o[m] = function() {
		console.log(new Date(), "Entering:", m);
		var result = original.apply(this, arguments);
		console.log(new Date(), "Exiting:", m);
		return result;
	};
}

console.log("---------------------------------");
/* bind()方法 ES5新增的方法 */
function f(y) { return this.x + y}
var o = { x : 1 };
var g = f.bind(o);
console.log(g(2));

console.log("---------------------------------");



