/**
 * 7.10 数组对象
 * ES5 中使用 isArray()判断
 */
/* ES3判断数组对象 */
var isArray = Function.isArray || function(o) {
    return typeof o === "object" && Object.prototype.toString.call(o) === "[object Array]";
}

/**
 * 类数组对象
 * JavaScript数组区别于其他对象的地方
 * 1. 当有新元素添加到列表中时,自动更新length属性
 * 2. 设置length为较小值时将截断数组
 * 3. 从Array.prototype中继承一些有用的方法
 * 4. 其类属性为Array
 */

var a = {};
var i = 0;
while (i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;

var total = 0;
for (var j = 0; j < a.length; j++)
    total += a[j];
console.log(total);

function isArrayLike(o) {
    if (o && typeof o === "object" &&
        isFinite(o.length) && //o.length是有限数值
        o.length >= 0 &&
        o.length < 4294967296) //小于 2^32
        return true;
    else
        return false;
}