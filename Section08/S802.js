/**
 * 8.2 函数调用
 * 作为函数
 * 作为方法
 * 作为构造函数
 * 通过它们的call()和Apply()方法简介调用
 */

/* 8.2.1 函数调用 */
//定义并调用一个函数来确认当前脚本运行时是否为严格模式
//以函数形式调用的函数通常不使用this关键字,通常可以使用"this"来判断当前是否为严格模式
var strict = (function() { return !this; }());
console.log(strict);

/* 8.2.2 方法调用 */
//一个方法无非是个保存在一个对象的属性里的JavaScript函数.
//方法调用和函数调用有一个重要区别,即调用上下文

var calculator = { // 对象直接量
    operand1: 1,
    operand2: 1,
    add: function() {
        //注意this关键字的用法, this指代当前对象
        this.result = this.operand1 + this.operand2;
    }
};
calculator.add();
console.log(calculator.result);

//o["m"](x); o.m(x)的另外一种写法
//a[0](z); 同样是方法的调用(这里假设a[0]是一个函数
//customer.surname.toUpperCase() 调用customer.surname的方法
//f().m() f()调用结束后继续调用返回值中的方法m()

/**
 * 需要注意的是, this是一个关键字,不是变量,也不是属性名. JavaScript不允许给this赋值.
 * 和变量不同,关键字this没有作用域的限制,嵌套的函数不会从调用它的函数中继承this.
 * 如果嵌套函数作为方法调用, 其this的值指向调用它的对象.
 * @type {Object}
 */
var o = { // 对象o
    m: function() { //对象中的方法m()
        var self = this; //将this的值保存至一个变量中
        console.log(this === o); //输出true, this就是这个对象o
        f(); //调用辅助函数f()
        function f() { // 定义一个嵌套函数f()
            console.log(this === o); //"false": this的值是全局对象或undefined
            console.log(self === o); //"true": self指外部函数的this值
        }
    }
};

o.m();

/* 8.2.3 构造函数调用 */
//构造函数调用和普通函数调用以及方法调用在实参处理, 调用上下文和返回值方面都有不同
//尽管构造函数看起来更像一个方法调用,它依然会使用这个新对象作为调用的上下文.也就是说, 在表达式new o.m()中,调用上下文并不是o.

/* 间接调用 */
//其中两个方法call()和apply()可以用来间接的调用函数.
