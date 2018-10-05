/**
 * 6.6 属性getter和setter
 * 对象属性是由名字、值和一组特性构成。
 * 在ECMAScript 5中，属性值可以由一个或两个方法替代，这两个方法就是setter和getter方法
 * 由getter和setter定义的属性称作“存取器属性”，它不同于“数据属性”，数据属性只有一个简单的值
 */

/*var o = {
    //普通的数据属性
    data_prop: value,

    //存取器属性都是成对定义的函数
    get acceessor_prop() {},
    set acceessor_prop(value) {}
};
*/
var p = {
    //x和y是普通的可读写属性
    x: 1.0,
    y: 1.0,
    //r是可读写的存取器属性，它有getter和setter
    //函数体结束后要带上逗号
    get r() { return Math.sqrt(this.x * this.x + this.y * this.y); },
    set r(newValue) {
        var oldValue = Math.sqrt(this.x * this.x + this.y * this.y);
        var radio = newValue / oldValue;
        this.x *= radio;
        this.y *= radio;
    },

    //theta是只读存取性属性，它只有getter属性
    get theta() { return Math.atan2(this.y, this.x) }
};

var q = Object.create(p);
q.x = 1, q.y = 1;
console.log(q.r);
console.log(q.theta);
console.log("-------------------------");

var serialnum = {
    // 这个数据属性包含下一个序列号
    // $符号暗示这个属性是一个私有属性
    $n: 0,

    // 返回当前值，然后自增
    get next() { return this.$n++; },

    // 给n设置新值，只有当它比当前值大时才设置成功
    set next(n) {
        if (n >= this.$n) {
            this.$n = n;
        } else {
            throw "序列号的值不能比当前值小";
        }
    }
}
console.log(serialnum.next);
console.log(serialnum.next = 1);
console.log(serialnum.next);
/**
 * 6.7 属性的特性
 * 数据属性的4个特性分别是：
 * 值（value），可写性（writable），可枚举（enumerable）和可配置（configurable）。
 * 存取器属性不具有值（value）特性和可写性，它们的可写性是由setter方法的存在与否决定的。
 */
console.log("-------------------------");
console.log(Object.getOwnPropertyDescriptor({ x: 1 }, "x"));
console.log(Object.getOwnPropertyDescriptor(serialnum, "next"));
console.log(Object.getOwnPropertyDescriptor(Math.random, "octet"));
console.log(Object.getOwnPropertyDescriptor({}, "x"));
console.log(Object.getOwnPropertyDescriptor({}, "toString"));

console.log("--------------------------");
var o = {}; // 创建一个空对象
// 添加一个不可枚举的数据属性x，并且赋值为1
Object.defineProperty(o, "x", {
    value: 1,
    writable: true,
    enumerable: false,
    configurable: true
});

// 属性是存在的，但不可枚举
o.x;
console.log(Object.keys(o));

//对属性x做修改，让它变为只读
Object.defineProperty(o, "x", { writable: false });

o.x = 2; // 操作失败但不报错，在严格模式下抛出类型错误异常
console.log(o.x);

//属性依然是可配置的，可以通过这种方式对它进行修改
Object.defineProperty(o, "x", { value: 2 });

console.log(o.x);

//将x从数据属性修改成存取器属性
Object.defineProperty(o, "x", { get: function() { return o; } });
console.log(o.x);

//***注意*** 该方法要么修改已有属性，要么新建自有属性，不能修改继承属性
//
//若修改或创建多个属性，需要使用Object.defineProperties(),第一个参数是要修改的对象，第二个参数是映射表
var p = Object.defineProperties({}, {
	x: {},
	y: {},
	r: {}
});

/**
 * 任何对Object.defineProperty()和Object.defineProperties()违反规则的使用都会抛出类型错误异常：
 * 1. 如果对象是不可扩展的，则可以编辑已有的自有属性，但不能添加新属性。
 * 2. 如果属性是不可配置的，则不能修改它的可配置性和可枚举性。
 * 3. 如果存取器属性是不可配置的，则不能修改其getter和setter方法，也不能将它转换为数据属性。
 * 4. 如果数据属性是不可配置的，则不能将它转换为存取器属性。
 * 5. 如果数据属性是不可配置的，则不能将它的可写性从false修改为true，但可以从true修改为false。
 * 6. 如果数据属性是不可配置且不可写的，则不能修改它的值。然而可配置但不可写属性的值是可以修改的（实际上是先将它标记为可写的，然后修改它的值，最后转换为不可写的）。
 */