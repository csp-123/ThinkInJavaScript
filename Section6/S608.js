/**
 * 6.8 对象的三个属性
 * 原型(prototype)、类(class)和可扩展性(extensibleattribute)
 * isPrototypeOf() 函数实现的功能和instanceof运算符非常类似
 * 6.8.1 原型属性
 * 对象的原型属性是用来继承属性的
 */
var p = { x: 1 }; //定义一个原型对象
var o = Object.create(p); //使用这个原型创建一个对象
console.log(p.isPrototypeOf(o)); // true o继承自p
console.log(Object.prototype.isPrototypeOf(o)); //true p继承自Object.prototype

console.log(typeof "a");
console.log("---------------------------------");

/**
 * 6.8.2 类属性
 * 对象的类属性是一个字符串，用以表示对象的类型信息
 * @param  {[type]} o [description]
 * @return {[type]}   [description]
 */
function classof(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1); //返回字符串第8到倒数第二位置的字符串
}

console.log(classof(o));
console.log(o.toString());
console.log(classof("abc"));
console.log("abc".toString());

console.log("\n");
console.log(classof(null));
console.log(classof(1));
console.log(classof(""));
console.log(classof(false));
console.log(classof({}));
console.log(classof([]));
console.log(classof(/./));
console.log(classof(new Date()));
//console.log(classof(window));
function f() {};
console.log(classof(new f()));

console.log("---------------------------------");
/**
 * 6.8.3 可扩展性
 * 对象的可扩展性用以表示是否可以给对象添加新属性。
 * 所有内置对象和自定义对象都是显示可扩展的，宿主对象的可扩展性是由JavaScript引擎定义的。
 */

console.log(Object.isExtensible(o));
//Object.preventExtensions(object); ***注意*** 一旦转换为不可扩展对象，就无法转换回来。
//该方法只影响对象本身，可通过给对象原型添加属性，使该对象继承属性增加属性。
//
//Object.seal()除了将对象设置为不可扩展，还将对象所有自有属性设置为不可配置的。
//可用Object.isSealed()判断对象是否封闭
//Object.freeze()更严格的将对象冻结除去seal()功能外，所有已有属性设置为只读（存取器属性不收影响）
//使用Object.isFrozen()来检测对象是否冻结


console.log("---------------------------------");
/**
/**
 * 6.9 序列化对象
 * 函数, RegExp, Error对象和undefined值不能序列化和还原
 * JSON.stringify()只能序列化对象的可枚举的自有属性
 */

o = { x: 1, y: { z: [false, null, ""] } };
console.log(o);
s = JSON.stringify(o);
console.log(s);
p = JSON.parse(s);
console.log(p);

/**
 * 6.10 对象方法
 * toString()
 * toLocalString() 每个数组元素会调用toLocalString()方法转换为字符串
 * toJSON()
 * valueOf()
 */

console.log(new Date().toJSON());
//console.log({}.toJSON());
//console.log([].toJSON());
//
console.log(new Date().valueOf()); //有些内置对象自定义了该方法