/**
 * 9.6.2 一个例子: 枚举类型
 * 这个函数创建一个新的枚举类型, 实参对象表示类每个实例的名字和值
 * 返回值是一个构造函数, 它标识这个新类
 * 注意, 这个构造函数也会抛出异常: 不能使用它来创建该类型的新实例
 * 返回的构造函数包含名/值对的映射表
 * 包括由值组成的数组, 以及一个foreach()迭代器函数
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


function enumeration(namesToValues) {
    // 这个虚拟的构造函数是返回值
    var enumeration = function() { throw "Can't Instantiate Enumerations"; };

    // 枚举值继承自这个对象
    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function() { return this.name; },
        valueOf: function() { return this.value; },
        toJSON: function() { return this.name }
    };

    enumeration.values = []; // 用以存放枚举对象的数组

    // 现在创建新类型的实例
    for (name in namesToValues) {
        var e = inherit(proto);
        e.name = name;
        e.value = namesToValues[name];
        enumeration[name] = e;
        enumeration.values.push(e);
    }

    // 一个类方法, 用来对类的实例进行迭代
    enumeration.foreach = function(f, c) {
        for (var i = 0; i < this.values.length; i++)
            f.call(c, this.values[i]);
    };

    // 返回标识这个新类型的构造函数
    return enumeration;
}

/**
 * 使用枚举类型来表示一副扑克牌
 */
// 定义一个表示"玩牌"的类
function Card(suit, rank) {
    this.suit = suit; // 花色
    this.rank = rank; // 点数
}

// 使用枚举类型定义花色和点数
Card.Suit = enumeration({ Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4 });
Card.Rank = enumeration({
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13,
    Ace: 14
});
// 定义用以描述牌面的文本
Card.prototype.toString = function() {
    return this.rank.toString() + " of " + this.suit.toString();
};

// 比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;
};

// 以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = function(a, b) { return a.compareTo(b); };

// 以桥牌的玩法对扑克牌排序
Card.orderBySuit = function(a, b) {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
};

// 定义用以表示一副标准扑克牌的类
function Deck() {
    var cards = this.cards = []; // 一副牌就是由牌组成的数组
    Card.Suit.foreach(function(s) {
        Card.Rank.foreach(function(r) {
            cards.push(new Card(s, r));
        });
    });

}

// 洗牌的方法: 重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function() {
    //...
}

/**
 * 9.6.3 标准转换方法
 */
extend(Set.prototype, {
    // 将集合转换为字符串
    toString: function() {
        var s = "{",
            i = 0;
        this.foreach(function(v) { s += ((i++ > 0) ? ", " : "") + v; });
        return s + "}";
    },
    // 类似 toString, 但是对于所有的值都将调用toLocaleString()
    toLocaleString: function() {
        var s = "{",
            i = 0;
        this.foreach(function(v) {
            if (i++ > 0) s += ", ";
            if (v == null) s += v;
            else s += v.toLocaleString();
        });
        return s + "}";
    },
    toArray: function() {
        var a = [];
        this.foreach(function(v) {
            a.push(v);
        });
        return a;
    }
});

Set.prototype.toJSON = Set.prototype.toArray;

/**
 * 9.6.4 比较方法
 * JavaScript的相等运算符比较对象时, 比较的是引用而不是值.
 */
Range.prototype.equals = function(that) {
    if (that == null) return false;
    if (that.constructor !== Range) return false;
    return this.from == that.from && this.to == that.to;
}

/**
 * 9.6.5 方法借用
 * 把一个类中的方法用到其他类中的做法
 */
var generic = {
    equals: function(that) {
        if (that == null) return false;
        if (this.constructor !== that.constructor) return false;
        for (var name in this) {
            if (name === "|**objectid**|") continue; // 跳过特殊属性
            if (!this.hasOwnProperty(name)) continue; // 跳过继承来的属性
            if (this[name] !== that[name]) return false;
        }
        return true;
    }
}

Range.prototype.equals = generic.equals;

/**
 * 9.6.6 私有状态
 */
function Range(from, to) {
    // 不要将端点保存为对象的属性, 定义存取器来返回端点的值, 这些值都保存在闭包中
    this.from = function() {
        return from;
    };
    this.to = function() {
        return to;
    }
}

// 原型上无法直接操作端点, 它们必须调用存取器方法
Range.prototype = {
    constructor: Range,
    includes: function(x) { return this.from() <= x && x <= this.to; }
}

var r = new Range(1, 5); // 一个不可修改的范围
r.from = function() { return 0; } // 通过方法替代来修改它

/**
 * 9.6.7 构造函数的重载和工厂方法
 */
// Set类的辅助构造函数
function SetFromArray(a) {
	// 通过以函数的形式调用Set()来初始化这个新对象
	// 将 a 的元素作为参数传入
	Set.apply(this, a);
}

// 设置原型 以便SetFromArray能创建Set的实例
SetFromArray.prototype = Set.prototype;

var s = new SetFromArray([1, 2, 3]);
a instanceof Set // true