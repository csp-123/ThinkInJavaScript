/**
 * 例9.19 属性描述符工具函数
 */
// 将o的指定名字 (或所有) 的属性设置为不可写的和不可配置的
function freezeProps(o) {
    // 如果只有一个参数,使用所有属性, 否则传入指定的属性名
    var props = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.prototype.splice.call(arguments, 1);

    props.foreach(function(n) { // 将他们都设置为只读的和不可变的
        // 忽略不可配置属性
        if (!Object.getOwnPropertyDescriptor(o, n).configurable) return;
        Object.defineProperty(o, n, { writable: false, configurable: false });
    });
    return o; // 所以我们可以继续使用它
}

// 将o的指定名字 (或所有) 的属性设置为不可枚举的和可配置的
function hideProps(o) {
    // 如果只有一个参数,使用所有属性, 否则传入指定的属性名
    var props = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.prototype.splice.call(arguments, 1);

    props.foreach(function(n) { // 将他们都设置为只读的和不可变的
        // 忽略不可配置属性
        if (!Object.getOwnPropertyDescriptor(o, n).configurable) return;
        Object.defineProperty(o, n, { enumerable: false });
    });
    return o; // 所以我们可以继续使用它
}

// 一个简单的不可变类
function Range(from, to) { // 不可变的类Range的构造函数
    this.from = from;
    this.to = to;
    freezeProps(this); // 将属性设置为不可变
}

Range.prototype = hideProps({ // 使用不可枚举的属性来定义原型
    constructor: Range,
    includes: function(x) { return this.from <= x && x <= this.to; }
});