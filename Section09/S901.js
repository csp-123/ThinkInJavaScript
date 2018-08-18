/**
 * 9.1 类和原型
 */
function inherit(p) {
    if (p == null) { throw TypeError(); }
    if (Object.create)
        return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function")
        throw TypeError();

    function f() {};
    f.prototype = p;
    return new f();
}
// 这个工厂方法返回一个新的 "范围对象"
function range(from, to) {
    // 使用 inherit() 函数来创建对象, 这个对象继承自下下面定义的原型对象
    // 原型对象作为函数的一个属性存储, 并定义所有 "范围对象" 所共享的方法(行为)
    var r = inherit(range.methods);

    // 存储新的 "范围对象" 的起始位置和结束位置(状态)
    // 这两个属性是不可继承的, 每个对象都拥有唯一的属性
    r.from = from;
    r.to = to;

    // 返回这个新创建的对象
    return r;
}

// 原型对象定义方法, 这些方法为每个范围对象所继承
range.methods = {
    // 如果 x 在范围内, 则返回 true , 否则返回 false
    // 这个方法可以比较数字范围, 也可以比较字符串和日期范围
    includes: function(x) {
        return this.from <= x && x <= this.to;
    },

    // 对于范围内的每个整数, 都调用一次f
    // 这个方法只可用做数字范围
    foreach: function(f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // 返回表示这个范围的字符串
    toString: function() {
        return "(" + this.from + "..." + this.to + ")";
    }
};

var r = range(1, 3);
console.log(r.includes(2));
r.foreach(console.log);
console.log(r.toString());
console.log("---------------------------------");

/**
 * 9.2 类和构造函数
 */
// 这是一个构造函数, 用来初始化新创建的 "范围对象"
// 注意, 这里并没有创建并返回一个对象, 仅仅是初始化
function Range(from, to) {
	// 存储 "范围对象" 的起始位置和结束位置
	// 这两个属性是不可继承的, 每个对象都拥有唯一的属性
	this.from = from;
	this.to = to;
}

// 所有的范围对象都继承自这个对象
// 注意, 属性的名字必须是 "prototype"
Range.prototype = {
	constructor: Range, // 显示设置构造函数反向引用
	// 如果 x 在范围内, 则返回 true , 否则返回 false
    // 这个方法可以比较数字范围, 也可以比较字符串和日期范围
    includes: function(x) {
        return this.from <= x && x <= this.to;
    },

    // 对于范围内的每个整数, 都调用一次f
    // 这个方法只可用做数字范围
    foreach: function(f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // 返回表示这个范围的字符串
    toString: function() {
        return "(" + this.from + "..." + this.to + ")";
    }
};

// 扩展预定义的 Range.prototype 对象, 而不是重写
Range.prototype.includes = function(x) { return this.from <= x && x <= this.to; }

var r2 = new Range(1, 4);
console.log(r2.includes(2));
r2.foreach(console.log);
console.log(r2.toString());

/* 9.2.2 constructor
每个JavaScript函数都自动拥有一个prototype属性. 这个属性的值是一个对象,
这个属性的值是一个对象, 这个对象包含唯一一个不可枚举属性constructor
 */
var F = function() {};
var p = F.prototype;
var c = p.constructor;
console.log(c === F);
var o = new F();
console.log(o.constructor === F);
