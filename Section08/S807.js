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
try {
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
function f(y) { return this.x + y }
var o = { x: 1 };
var g = f.bind(o);
console.log(g(2));

console.log("---------------------------------");
var sum = function(x, y) { return x + y; } // 返回两个实参的和值
// 创建一个类似sum的新函数, 但this的值绑定到null
// 并且第一个值绑定到1, 这个新的函数期望只传入一个实参
var succ = sum.bind(null, 1);
console.log(succ(2)); // => x绑定到1, 并传入2作为实参y

function k(y, z) { return this.x + y + z; } // 另外一个做累加计算的函数
var h = k.bind({ x: 1 }, 2);
console.log(h(3));

console.log("---------------------------------");
/* 
8.7.6 Function()构造函数 
关于Function()构造函数有几点需要注意
1. Function()构造函数允许JavaScript在运行时动态的创建并编译函数.
2. 每次调用Function()构造函数都会解析函数体, 并创建新的函数对象.
   如果是在一个循环中或多次调用的函数中执行这个构造函数, 执行效率会受到影响.
   相比之下, 循环中的嵌套函数和函数定义表达式则不会每次执行时都重新编译.
3. 最后一点, 也是关于Function()构造函数非常重要的一点, 就是它所创建的函数
   并不是使用词法作用域, 相反, 函数体代码的编译总是会在顶层函数执行.
*/
var scope = "global";
function constructFunction() {
	var scope = "local";
	return new Function("return scope"); // 无法捕获局部作用域
}
// 这一行代码返回global, 因为通过Function()构造函数
// 所返回的函数使用的不是局部作用域
console.log(constructFunction()());

