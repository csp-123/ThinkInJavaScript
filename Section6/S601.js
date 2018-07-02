/*
属性包括名字和值。属性名可以是包含空字符串在内的任意字符串，但对象中不能存在两个同名的属性。
属性还有一些与之相关的值，称为“属性特性”：
1. 可写：表明是否可以设置该属性的值。
2. 可枚举：表明是否可以通过for/in循环返回该属性。
3. 可配置：表明是否可以删除或修改该属性。

除了包含属性之外，每个对象还拥有三个相关的对象特性：
1. 对象的原型指向另外一个对象，本对象的属性继承自它的原型对象。
2. 对象的类是一个标识对象类型的字符串。
3. 对象的扩展标记指明了是否可向该对象添加新属性。

三类JavaScript对象和两类属性做区分
1. 内置对象（native object）是由ECMAScript规范定义的对象或类。例如，数组、函数、日期和正则表达式都是内置对象。
2. 宿主对象（host object）是由JavaScript解释器所嵌入的宿主环境（比如Web浏览器）定义的。宿主对象也可以当成内置对象。
3. 自定义对象（user-defined object）是由运行中的JavaScript代码创建的对象。
4. 自由属性（own property）是直接在对象中定义的属性。
5. 继承属性（inherited property）是在对象的原型对象中定义的属性。
 */

/**
 * 6.1 创建对象
 * 6.1.1 对象直接量
 */
var empty = {};
var point = { x: 0, y: 0 };
var point2 = { x: point.x, y: point.y + 1 };
var book = {
    "main title": "JavaScript", //属性名有空格必须用字符串表示
    "sub-title": "The Definitive Guide", //属性名有连字符必须用字符串表示
    "for": "all audiences", //“for”是保留字，必须用引号
    author: {
        firstname: "Davide",
        surname: "Flanagan"
    }
};

/**
 * 6.1.2 通过new创建对象
 */

var o = new Object(); //创建一个空对象，和{}一样
var a = new Array(); //创建一个空数组，和[]一样
var d = new Date();
var r = new RegExp("js");


function t() {
    return "0018";
}

console.log(t());

/**
 * 6.14 Object.create()
 */

var o1 = Object.create({ x: 1, y: 2 }); // o1继承了属性x和y
var o2 = Object.create(null); // o2不继承任何属性和方法，甚至不包括基础方法，比如toString()，也就是说，它不能和“+”运算符一起工作
var o3 = Object.create(Object.prototype); //o3和{}和new Object()一样 

/**
 * eg: 通过原型继承创建一个新对象
 *
 * inherit() 返回一个继承自原型对象p的属性的新对象
 * 这里使用ECMAScript 5中的Object.create()函数 （如果存在的话）
 * 如果不存在Object.create()，则退化使用其他方法
 */

function inherit(p) {
    if (p == null) { throw TypeError(); }
    if (Object.create)
        return Object.create(p);
    var t = typeof p;
    if (t !== "object" && t !== "function")
        throw TypeError();

    function f() {};
    f.prototype = p;
    return new f();
}

var o = {x: "don't change this value"};
//library_function(inherit(o));  //防止对o意外修改


/**
 * 6.2.2 继承
 * 属性赋值操作首先检查原型链，以此来判断是否允许赋值操作。
 * eg：如果o继承自一个只读属性x，那么赋值操作是不允许的。如果允许赋值操作，它也总是在原始对象创建属性或对已有属性赋值，而不会改变原型链。
 * 在JavaScript中，只有在查询属性时才会体会到继承的存在，而设置属性则和继承无关，该特性可以让程序猿有选择的覆盖继承的属性。
 *
 * 需要注意的是：（有点晕）
 * 如果o继承自属性x，而这个属性是一个具有setter方法的accessor属性，那么这时调用setter方法而不是给o创建一个属性x。setter方法
 * 是由对象o调用的，而不是定义这个属性的原型对象调用的。因此如果setter方法定义任意属性，这个操作只是针对o本身，并不会修改原型链。
 */

var o = {};  //o从Object.prototype 继承对象的方法
o.x = 1;	 //给o定义一个属性x
var p = inherit(o);	//p 继承 o 和 Object.prototype
p.y = 2;	//给 p 定义一个属性y
var q = inherit(p);	//q 继承 p、o和Object.prototype
q.z = 3;	// 给 q 定义一个属性z
var s = q.toString();	//	toString() 继承自 Object.prototype
console.log(s);
console.log(q.x + q.y);

/**
 * 6.2.3 属性访问错误
 * 在一下这些情况中给对象o设置属性p会失败：
 * 1. o中的属性p是只读的：不能给只读属性赋值（defineProperty()方法中有一个例外，可以对可配置的只读属性重新赋值）
 * 2. o中的属性p是继承属性，且它是只读的：不能通过同名自有属性覆盖只读的继承属性
 * 3. o中不存在自有属性p：o没有使用setter方法继承属性p，并且o的可扩展性是false。如果o中不存在p，而且没有setter方法可供调用，则p
 * 		一定添加至o中，但是如果o不是可扩展的，那么在o中不能定义新属性。
 */