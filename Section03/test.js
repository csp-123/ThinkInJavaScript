/**
 * 3.8 显示的类型转换
 * Number类定义的toString()可以接受表示转换基数(radix)的可选参数，若不指定则默认是十进制
 */
var n = 17;
console.info(n.toString(2));
console.info("O" + n.toString(8));
console.info("Ox" + n.toString(16));
/*output
10001
O21
Ox11
 */
var n = 123456.789;
console.info(n.toFixed(0));
console.info(n.toFixed(3));
console.info(n.toFixed(5));
console.info(n.toExponential(1));
console.info(n.toExponential(3));
console.info(n.toPrecision(4));
console.info(n.toPrecision(7));
console.info(n.toPrecision(10));

//3.8.3 对象转换为原始值
console.info({x:1,y:2}.toString());
console.info([1,2,3].toString());
console.info(function(x){f(x)}.toString());
console.info(/\d+/g.toString());
console.info(new Date(2010,0,1).toString());

/*
JavaScript中对象到字符串的转换经过了如下这些步骤：
	1. 如果对象具有toString()方法，则调用这个方法。如果返回的是一个原始值，将把这个值转换为字符串。
	2. 如果对象没有toString()方法，或者这个方法不返回一个原始值，那么将调用valueOf()方法。
	3. 否则，JavaScript无法从toString()或valueOf()获得原始值，因此将抛出类型异常。

JavaScript中对象到数字的转换过程
	1. 如果对象具有valueOf()方法，返回原始值，JavaScript将这个原始值转换成一个数字。
	2. 否则，如果对象具有toString()方法，返回一个原始值。
	3. 否则，JavaScript抛出类型异常错误。
 */