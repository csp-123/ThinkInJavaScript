/**
 * 8.6 闭包
 */
var scope = "global scope"; // 全局变量
function checkscope() {
    var scope = "local scope";

    function f() {
        return scope;
    }
    console.log("*" + scope);
    return f();
}
console.log("**" + checkscope());
console.log("***" + scope);

var scope = "global scope1";

function checkscope1() {
    var scope = "local scope1";
    console.log("*" + scope);

    function f() {
        return scope;
    }
    return f;
}
console.log("**" + checkscope1()());
console.log("***" + scope);

console.log("---------------------------");
var uniqueInteger = (function() {
    var counter = 0;
    return function() {
        return counter++;
    }
}());
console.log(uniqueInteger());
console.log(uniqueInteger());

console.log("---------------------------");

function counter() {
    var n = 0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0; }
    };
}
var c = counter(),
    d = counter();
console.log(c.count());
console.log(d.count());
c.reset();
console.log(c.count());
console.log(d.count());

console.log("---------------------------");

function counter1(n) {
    return {
        get count() { return n++; },
        set count(m) {
            if (m >= n)
                n = m;
            else throw Error("need a larger value");
        }
    }
}
var c = counter1(1000);
console.log(c.count);
console.log(c.count);
c.count = 2000;
console.log(c.count);
try {
    c.count = 2000;
} catch (e) {
    console.log(e);
}

console.log("---------------------------");
/**
 * 利用闭包实现的私有属性存取器
 */
function addPrivateProperty(o, name, predicate) {
    var value;

    // getter 方法简单地将其返回
    o["get" + name] = function() { return value; };

    // setter 方法首先检查值是否合法, 若不合法就抛出异常
    // 否则就将其存储起来
    o["set" + name] = function(v) {
        if (predicate && !predicate(v))
            throw Error("set" + name + ": invalid value " + v);
        else
            value = v;
    };
}
// 下面的代码展示了addPrivateProperty()方法
var o = {}; // 设置一个空对象

// 增加属性存取器方法getName()和setName()
// 确保只允许字符串值
addPrivateProperty(o, "Name", function(x) { return typeof x == "string"; });

o.setName("Frank");
console.log(o.getName());

try {
    o.setName(0);
} catch (e) {
    console.log(e);
}

console.log("---------------------------");

function constfunc(v) { return function() { return v; }; }
var func = [];
for(var i = 0; i < 10; i++)
	func[i] = constfunc(i);
console.log(func[5]()); // 5
console.log(func[0]()); // 0

// 嵌套的函数不会将作用域内的私有成员复制一份, 也不会对所绑定的变量生成静态快照
function constfuncs() {
    var funcs = [];
    for (var i = 0; i < 10; i++) {
        funcs[i] = function() { return i; };
    }
    return funcs;
}
var funcs = constfuncs();
console.log(funcs[5]()); // 10
console.log(funcs[1]()); // 10


