/**
 * 8.3 函数的实参和形参
 */
function f(x, y, z) {

    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
    console.log(arguments[3]);
    //首先,验证传入参数个数
    if (arguments.length != 3) {
        console.log("function f called width " + arguments.length + "arguments, but it expects 3 arguments.")
    }
}

f(0, 1, 2);
f(0, 1, 2, 3);

/**
 * 实参对象有一个重要用处, 就是让函数可以操作任意数量的实参.
 * @return {[type]} [description]
 */
function max() {
    var max = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) max = arguments[i];
    }
    return max;
}

var largest = max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6);
console.log(largest);
console.log("-----------------------------");
/**
 * callee和caller属性
 * 除了数组元素,实参对象还定义了callee和caller属性.
 * callee属性指代当前正在执行的函数.
 * caller属性指代调用当前正在执行的函数的函数.
 *
 * callee属性在某些时候非常有用,比如在匿名函数中通过callee递归调用自身.
 */

var factorial = function(x) {
    if (x <= 1) return 1;
    return x * arguments.callee(x - 1);
}

console.log(factorial(10));

