/**
 * 在函数体内，局部变量的优先级高于同名的全局变量
 * 如果在函数体内声明一个局部变量或者函数参数中带有的变量和全局变量重名，那么全局变量会被局部变量所遮盖
 */
 var scope = "global";

 function checkscope() {
 	var scope = "local";
 	console.info(scope);
 	return scope;
 }
 console.info(checkscope());
 console.info(scope);
/*output
local
local
global
*/

console.info("*************END************");

scope1 = "global";

function checkscope2() {
	scope1 = "local";
	myscope = "local";
	return [scope1, myscope];
}
console.info(checkscope2());
console.info(scope1);
/*output
[ 'local', 'local' ]
local
*/

console.info("*************END************");

var scope2 = "global scope";

function checkscope3() {
	var scope2 = "local scope";
	function nested() {
		var scope2 = "nested scope";
		console.info(scope2);
		return scope2;
	}
	console.info(nested());
	return nested();
}
console.info(checkscope3());
/*
nested scope
nested scope
nested scope
nested scope
*/

console.info("*************END************");
/**
 * JavaScript函数里声明的所有变量（但不涉及赋值）都被“提前” 至函数体的顶部，这个特性被非正式地称为声明提前。
 * @param  {[type]} o [description]
 * @return {[type]}   [description]
 */
function test(o) {
	var i = 0;							// i 在整个函数体内都有定义 
	if(typeof o == "object") {
		var j  = 0;						// j 在整个函数体内都有定义，不仅仅在这个代码段
		for(var k = 0; k < 10; k++) {	// k 在函数体内是有定义的，不仅仅在循环内
			console.info(k);
		}
		console.info(k);
	}
	console.info(j);
}

test(new Object());

console.info("*************END************");
/**
 * 由于函数作用域的特性，局部变量在整个函数体始终是有定义的，
 * 在函数体内局部变量遮盖了同名全局变量。
 * 函数内变量声明“提前”至函数顶部，变量初始化留在原来的位置。
 * @type {String}
 */
var scope3 = "global";
function f() {
	console.info(scope3);
	var scope3 = "local";
	console.info(scope3);
}

f();
/*
undefined
local
 */

console.info("*************END************");
/**
 * 当声明一个JavaScript全局变量时，实际上是定义了全局对象的一个属性，当使用var声明一个变量时，创建的这个属性是不可配置的，无法通过delete运算符删除。
 * 当非严格模式下，给一个未声明的变量赋值的话，JavaScript会创建一个全局变量，这种方式创建的变量是全局对象的正常的可配置属性，并可以删除。
 * *** JavaScript全局变量是全局对象的属性，这是在ECMAScript规范中强制规定的。
 * @type {Number}
 */
var truevar = 1;
fakevar = 2;
this.fakevar2 = 3;
console.info(delete truevar);
console.info(delete fakevar);
console.info(delete this.fakevar2);
/*
false
true
true
 */

console.info("*************END************");
