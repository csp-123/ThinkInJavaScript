/**
 * 9.3 JavaScript 中 Java 式的类继承
 * JavaScript 中的类牵扯三种不同的对象:
 * 构造函数对象:
 * 		构造函数(对象)为JavaScript的类定义了名字. 
 * 		任何添加到这个构造函数中的对象的属性都是类字段或类方法.
 * 原型对象:
 * 		原型对象的属性被类的所有实例所继承, 如果原型对象的属性值是函数的话,
 * 		这个函数就作为类的实例的方法来调用.
 * 实例对象:
 * 		类的每个实例都是一个独立的对象, 直接给这个实例定义的属性是不会为
 * 		所有实例对象所共享的. 定义在实例上的非函数属性, 实际上是实例的字段.
 */
function extend(o) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var prop in source)
            o[prop] = source[prop];
    }
    return o;
};
// 一个用以定义简单类的函数
function defineClass(constructor, // 用以设置实例的属性的函数
    methods, // 实例的方法, 复制至原型中
    statics) // 类属性, 复制到构造函数中
{
    if (methods)
        extend(constructor.prototype, methods);
    if (statics)
        extend(constructor, statics);
    return constructor;
}

// 这是一个range类的实现
var SimpleRange = defineClass(function(f, t) {
    this.f = f;
    this.t = t;
}, {
    includes: function(x) { return this.f <= x && x <= this.t },
    toString: function() { return this.f + "..." + this.t; }
}, {
    upto: function(t) { return new SimpleRange(0, t); }
});


/**
 * 9.4 类的扩展
 */
// 多次调用这个函数f, 传入一个迭代数
// 比如, 要输出 "hello" 三次
// var n = 3;
// n.times(function(n) { console.log(n + " hello"); })
Number.prototype.times = function(f, context) {
    var n = Number(this);
    for (var i = 0; i <= n; i++)
        f.call(context, i);
}

var n = 3;
n.times(function(n) { console.log(n + " hello"); })