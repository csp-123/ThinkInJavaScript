var f = function(x) { return x + 1; } //将表达式赋值给一个变量

function g(x) { return x + 1; } //含有变量名的语句

/*
函数声明通常出现在JavaScript最顶层，也可以嵌套在其他函数体内，但嵌套时，函数声明只能出现在所嵌套函数的顶部。

使用var声明函数和通过var声明变量一样，变量声明提前了，但是初始化在原来的位置。

使用函数声明语句函数名和函数体均提前。

 */

var o = { x: 1, y: 2, z: 3 };
var a = [],
    i = 0;
for (a[i++] in o);
for (i in o)
    console.log(i);
for(i in a)
	console.log(i);

/*
x
y
z
0
1
2
 */