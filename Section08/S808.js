/**
 * 8.8 函数式编程
 */
var data = [1, 1, 3, 5, 5];
var total = 0;
for (var i = 0; i < data.length; i++) {
    total += data[i];
}
var mean = total / data.length;
console.log(mean);

total = 0;
for (var i = 0; i < data.length; i++) {
    var deviation = data[i] - mean;
    total += deviation * deviation;
}
var stddev = Math.sqrt(total / (data.length - 1));
console.log(stddev);

// 使用map()和reduce()来实现同样的计算
var sum = function(x, y) { return x + y; };
var square = function(x) { return x * x; };

var data = [1, 1, 3, 5, 5];
var mean = data.reduce(sum) / data.length;
console.log(mean);
var deviations = data.map(function(x) { return x - mean; });
var stddev = Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1));
console.log(stddev);
console.log("---------------------------------");

/*
8.8.2 高阶函数
所谓高阶函数就是操作函数的函数,它接收一个或多个函数作为参数, 并返回一个新函数.
 */
function not(f) {
    return function() {
        var result = f.apply(this, arguments);
        return !result;
    }
}

var event = function(x) { // 判断是否为偶数的函数
    return x % 2 === 0;
}

var odd = not(event);
console.log([1, 1, 3, 5, 5].every(odd));

function mapper(f) {
    return function(a) { return map(a, f); };
}

var increment = function(x) { return x + 1; };
var incrementer = mapper(increment);
console.log(incrementer([1, 2, 3]));
console.log("---------------------------------");

/* 8.8.4 记忆 */
function memorize(f) {
    var cache = {}; // 将值保存在闭包内
    return function() {
        // 将实参转换为字符串形式, 并将其用做缓存的键
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) return cache[key];
        else return cache[key] = f.apply(this, arguments);
    };
}