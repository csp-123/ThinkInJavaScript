/**
 * 8.4 作为值的函数
 */

function square(x) {
    return x * x;
}

var s = square; // 现在s和square指代同一个函数
console.log(square(4));
console.log(s(4));

var o = { square: function(x) { return x * x; } }; // 对象直接量
var y = o.square(16);
console.log(y);

var a = [function(x) { return x * x; }, 20]; // 数组直接量
console.log(a[0](a[1]));
console.log("-------------------------");

var operators = {
    add: function(x, y) { return x + y },
    subtract: function(x, y) { return x - y; },
    multiply: function(x, y) { return x * y; },
    divide: function(x, y) { return x / y; },
    pow: Math.pow //使用预定义的函数
};

function operate(operation, operand1, operand2) {
    if (typeof operators[operation] === "function")
        return operators[operation](operand1, operand2);
    else throw "unknown operator";
}

var j = operate("add", "hello", operate("add", " ", "world"));
console.log(j);

var k = operate("pow", 10, 2);
console.log(k);

console.log("-------------------------");
/* 自定义函数属性 */
//初始化函数对象的计数器属性
//由于函数声明被提前了, 因此这里是可以在函数声明之前给它的成员
uniqueInteger.counter = 0;

//每次调用这个函数都会返回一个不同的整数
//它使用一个属性来记住下一次将要返回的值
function uniqueInteger() {
    return uniqueInteger.counter++;
}
console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());

/**
 * 8.5 作为命名空间的函数
 */
(function() {
    // 模块代码
}()); // 结束函数定义并立即调用它

/**
 * 特定场景下返回带补丁的extend()版本
 * 定义一个扩展函数, 用来将第二个以及后续参数复制至第一个参数
 * 这里我们处理了IE bug: 在多数IE版本中
 * 如果o的属性拥有一个不可枚举的同名属性, 则for/in循环不会枚举
 * 对象o的可枚举属性, 也就是说, 将不会正确地处理诸如toString的属性
 * 除非我们显示检测它.
 */
var extend = (function() { // 将这个函数的返回值赋值给extend
    console.log("***");
    // 在修复它之前, 首先检查是否存在bug
    for (var p in { toString: null }) {
        // 如果代码执行到这里, 那么for/in循环会正确工作并返回
        // 一个简单版本的extend()函数
        return function extend(o) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var prop in source)
                    o[prop] = source[prop];
            }
            return o;
        };
    }
    // 如果代码执行到这里, 说明for/in循环不会枚举测试对象的toString属性
    // 因此返回另一个版本的extend()函数, 这个函数显示测试
    // Object.prototype中的不可枚举属性
    return function patched_extend(o) {
        for (var i = 1; i < argumrnts.length; i++) {
            var source = argumrnts[i];
            // 复制所有的可枚举属性
            for (var prop in source)
                o[prop] = source[prop];

            // 现在检查特殊属性
            for (var j = 0; j < protoprops.length; j++) {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop))
                    o[prop] = source[prop];
            }
        }
        return o;
    };

    // 这个列表列出了需要检查的特殊属性
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString"];
}());