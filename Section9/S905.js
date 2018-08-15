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
    if (x == null) return ""; // Null 和 undefined 没有构造函数
    switch (x.constructor) {
        case Number:
            return "Number: " + x; // 处理原始类型
        case String:
            return "String: '" + x + "'";
        case Date:
            return "Date: " + x; // 处理内置类型
        case RegExp:
            return "Regexp: " + x;
        case Complex:
            return "Complex: " + x; // 处理自定义类型
    }
}

console.log(typeAndValue(3));

/**
 * 9.5.3 构造函数的名称
 * type()函数
 * 以字符串形式返回o的类型:
 * 	-如果o是null, 返回 "null"; 如果o是 NaN, 返回 "nan"
 * 	-如果typeof所返回的值不是 "object", 则返回这个值
 * 	(注意, 有一些JavaScript的实现将正则表达式识别为函数)
 * 	-如果o的类不是 "Object", 则返回这个值
 * 	-如果o包含构造函数并且这个构造函数具有名称, 则返回这个名称
 * 	-否则, 一律返回 "Object"
 */
function tyoe(o) {
    var t, c, n; // type, class, name

    // 处理null值的特殊情形
    if (o === null) return "null";

    // 另外一种特殊情形: NaN和它自身不相等
    if (o !== o) return "nan";

    // 如果typeof的值不是"object", 则使用这个值
    // 这可以识别出原始值的类型和函数
    if ((t = typeof o) !== "Object") return t;

    // 返回对象的类名, 除非值为 "Object"
    // 这种方式可以识别出大多数的内置对象
    if ((c = classof(o)) !== "Object") return c;

    // 如果对象构造函数的名字存在的话, 则返回它
    if (o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName()))
        return n;

    // 其他的类型都无法辨别, 一律返回"Object"
    return "Object";
}

// 返回对象的类
function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
};

// 返回函数的名字 (可能是空字符串), 不是函数的话返回null
Function.prototype.getName = function() {
    if ("name" in this) return this.name;
    return this.name = this.toString().match(/function\s*([^(]*)\(/)[1];
};