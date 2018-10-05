/**
 * 10.1 正则表达式的定义
 */
// 这两段代码都创建一个新的RegExp对象
var pattern = /s$/;
var pattern = new RegExp("s$");

/**
 * 10.3 RegExp 对象
 * 每个 RegExp 对象都包含5个属性
 * source 属性是一个只读字符串, 包含正则表达式的文本
 * global 属性是一个只读的布尔值, 用以标识这个正则表达式是否带有修饰符g
 * ingoreCase 属性是一个只读布尔值, 用以说明正则表达式是否带有修饰符i
 * multiline 属性是一个只读布尔值, 用以说明正则表达式是否带有修饰符m
 * lastIndex 属性是一个可读/写的整数
 */

// 如果让一个带有修饰符g的正则表达式对多个字符串执行exec()和test(), 要么在每个字符串中找出
// 所有匹配结果以便将lastIndex自动重置为0,要么显示将lastIndex手动置为0. 如果不带修饰符g则不必担心发生这种情况
// 在ES 5 中, 正则表达式直接量的每次计算都会创建一个新的RegExp对象, 每个对象拥有自己的lastIndex属性, 这样会减少"残留"lastIndex的影响
var pattern = /Java/g;
var test = "JavaScript is more fun than Java!";

var result;
while ((result = pattern.exec(test)) != null) {
    console.log("Matched '" + result[0] + "'" + " at position " + result.index + "; next search begins at " + pattern.lastIndex);
}

var pattern = /java/i;
console.log(pattern.test("JavaScript"));