/**
 * 9.7.1 定义子类
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
// B.prototype = inherit(A.prototype); 子类派生自父类
// B.prototype.constructor = B; 重载继承来的constructor属性
// 
// 例9-11: 定义子类
// 用一个简单的函数创建简单的子类
function defineSubclass(superclass, // 父类的构造函数
    constructor, // 新的子类的构造函数
    methods, // 实例方法: 复制到原型中
    statics) // 类属性: 复制到构造函数中
{
    // 建立子类的原型对象
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;
    // 像对常规类一样复制方法和类属性
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    // 返回这个类
    return constructor;
}

// 也可以通过父类构造函数的方法来做到这一点
Function.prototype.extend = function(constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
}

// 例9-12: SingletonSet: 一个简单的子类
// 构造函数
function SingletonSet(member) {
    this.member = member; // 记录集合中这个唯一的成员
}

// 创建一个原型对象, 这个原型对象继承自Set的原型
SingletonSet.prototype = inherit(Set.prototype);

// 给原型添加属性
// 如果有同名的属性就覆盖Set.prototype中的同名属性
extend(SingletonSet.prototype, {
    // 设置合适的constructor属性
    constructor: SingletonSet,
    // 这个集合是只读的: 调用add()和remove()都会报错
    add: function() {
        throw "read-only set";
    },
    remove: function() {
        throw "read-only set";
    },
    // SingletonSet的实例中永远只有一个元素
    size: function() {
        return 1;
    },
    // 这个方法只调用一次, 传入这个集合的唯一成员
    foreach: function(f, context) {
        f.call(context, this.member);
    },
    // contains()方法非常简单: 只需检查传入的值是否匹配这个集合唯一的成员即可
    contains: function(x) {
        return x === this.member;
    }
});

SingletonSet.prototype.equals = function(that) {
	return that instanceof Set && that.size() == 1 && that.contains(this.member);
}

/**
 * 9.7.2 构造函数和方法链
 * 例9-13: 在子类中调用父类的构造函数和方法
 * NonNullSet 是Set的子类, 它的成员不能是null 和 undefined
 */
function NonNullSet() {
	// 仅链接到父类
	// 作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建对象
	Set.apply(this, arguments);
}

// 将NonNullSet设置为Set的子类
NonNullSet.prototype = inherit(Set.prototype);
NonNullSet.prototype.constructor = NonNullSet;

// 为了将null和undefined排除在外, 只需重写add()方法
NonNullSet.prototype.add = function() {
	// 检查参数是不是null和undefined
	for(var i = 0; i < arguments.length; i++)
		if(arguments[i] == null)
			throw new Error("Can't add null or undefined to a NonNullSet");

	// 调用父类的add()方法以执行实际插入操作
	return Set.prototype.add.apply(this, arguments);
}

// 例9-14: 类工厂和方法链
// 这个函数返回具体Set类的子类
// 并重写该类的add()方法用以对添加的元素做特殊的过滤
function filteredSetSubclass(superclass, filter) {
	var constructor = function() { // 子类构造函数
		superclass.apply(this, arguments); // 调用父类的构造函数
	};
	var proto = constructor.prototype = inherit(superclass.prototype);
	proto.constructor = constructor;
	proto.add = function() {
		// 在添加任何成员之前首先使用过滤器将所有参数进行过滤
		for (var i = 0; i < arguments.length; i++) {
			var v = arguments[i];
			if(!filter(v)) throw ("value " + v + " rejected by filter");
		}
		// 调用父类的add()方法
		superclass.prototype.add.apply(this, arguments);
	};
	return constructor;
}