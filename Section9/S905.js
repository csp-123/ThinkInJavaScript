/**
 * 9.5 类和类型
 * 9.5.1 instanceof运算符(p212) 
 */


/**
 * 9.5.2 constructor属性
 * 1. 使用constructor属性检测对象属于某个类的技术的不足之处和instanceof一样.
 * 在多个执行上下文的场景中它是无法工作的.
 * 2. JavaScript中并非所有的对象都包含constructor属性.
 */
function typeAndValue(x) {
	if(x == null) return ""; // Null 和 undefined 没有构造函数
	switch(x.constructor) {
		case Number: return "Number: " + x; // 处理原始类型
		case String: return "String: '" + x + "'"; 
		case Date: return "Date: " + x; // 处理内置类型
		case RegExp: return "Regexp: " + x;
		case Complex: return "Complex: " + x; // 处理自定义类型
	}
}

console.log(typeAndValue(3));

/**
 * 9.5.3 构造函数的名称
 */