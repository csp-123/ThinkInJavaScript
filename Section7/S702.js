/**
 * 7.2 数组元素的读和写
 * 使用[]操作符访问数组的元素
 * 数组是对象的特殊形式,数组的特别之处在于,当使用小于2^32的非负整数作为属性名时,数组会自动维护其length属性值
 * 所有的索引都是属性名,但只有在0~2^32-2之间的整数属性名才是索引.
 */

/**
 * 7.3 稀疏数组
 * 稀疏数组就是包含从0开始的不连续索引的数组,通常length属性会大于元素的个数.
 */

var a = new Array(5);
a = [];
a[1000] = 0; //此时length = 1001

var a1 = [, , , ]; //数组[undefined, undefined, undefined]
console.log(a1);
var a2 = new Array(3); //数组中不存在元素
console.log(a2);

console.log(0 in a1);
console.log(a1.length);
for (tmp in a1)
    console.log(tmp);
console.log(0 in a2);
console.log(a2.length);
for (tmp in a2)
    console.log(tmp);
/*
[ <3 empty items> ]
[ <3 empty items> ]
false
3
false
3
 */

console.log("---------------------------------");

/**
 * 7.5 数组元素的添加和删除
 */

var a = [];
a[0] = "zero";
a[1] = "one";

var a = [];
a.push("zero");
a.push("one", "two");

console.log(a.toString());

a = [1, 2, 3];
delete a[1];
console.log(a.toString());
console.log(a.length);

console.log("---------------------------------");
/**
 * 7.8 数组方法
 */
/* join */
var a = [1, 2, 3];
console.log(a.join()); // 1,2,3
console.log(a.join(" ")); // 1 2 3
console.log(a.join("")); //
var b = new Array(10); // 123
console.log(b.join("-")); // ---------

/* reverse */
console.log();
console.log(a.reverse().join()); // 3,2,1  reverse()数组元素逆序
console.log();

/* sort */
var a = new Array("banana", "cherry", "apple");
a.sort();
console.log(a.join(", ")); // apple, banana, cherry

var a = [33, 4, 1111, 222];
a.sort();
console.log(a.join(", ")); // 1111, 222, 33, 4

a.sort(function(a, b) {
    return a - b;
});
console.log(a.join(", ")); //4, 33, 222, 1111

/* concat */
var a = [1, 2, 3];
var b = a.concat(4, 5);
console.log(b); // [ 1, 2, 3, 4, 5 ]
var c = a.concat([4, 5]);
console.log(c); // [ 1, 2, 3, 4, 5 ]
var d = a.concat([4, 5], [6, 7]);
console.log(d); // [ 1, 2, 3, 4, 5, 6, 7 ]
var e = a.concat(4, [5, [6, 7]]);
console.log(e); // [ 1, 2, 3, 4, 5, [ 6, 7 ] ]
console.log(e.toString()); //1,2,3,4,5,6,7
console.log();

/* slice 包含第一个参数指定的位置和所有到但不含第二个参数指定的位置 */
var a = [1, 2, 3, 4, 5];
console.log(a.slice(0, 3)); //[ 1, 2, 3 ]
console.log(a.slice(3)); //[ 4, 5 ]
console.log(a.slice(1, -1)); //[ 2, 3, 4 ]
console.log(a.slice(-3, -2)); //[ 1, 2, 3 ]
console.log();

/* splice 会修改调用的数组 */
var a = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(a.splice(4)); // [ 5, 6, 7, 8 ]
console.log(a); //[ 1, 2, 3, 4 ]
console.log(a.splice(1, 2)); //[ 2, 3 ]
console.log(a); //[ 1, 4 ]
console.log(a.splice(1, 1)); //[ 4 ]
console.log(a); //[ 1 ]

var a = [1, 2, 3, 4, 5];
console.log(a.splice(2, 0, 'a', 'b')); //[]
console.log(a); //[ 1, 2, 'a', 'b', 3, 4, 5 ]
console.log(a.splice(2, 2, [1, 2], 3)); //[ 'a', 'b' ]
console.log(a); //[ 1, 2, [ 1, 2 ], 3, 3, 4, 5 ]
console.log();

/* push pop */
var stack = [];
console.log(stack.push(1, 2)); //2
console.log(stack.pop()); //2
console.log(stack.push(3)); //2 (栈中元素个数)
console.log();

/* unshift和shift 类似push和shift */

console.log("---------------------------------");

/**
 * 7.9 ECMAScript 5中的数组方法
 */
/*
forEach() 方法从头至尾遍历数组, 为每个元素调用指定的函数.
 */
var data = [1, 2, 3, 4, 5];
var sum = 0;
data.forEach(function(value) {
    sum += value;
});
console.log(sum);

data.forEach(function(v, i, a) { //数组元素 元素的索引 数组本身   
    a[i] = v + 1;
});

console.log(data);

/* 
注意: forEach()无法在所有元素都传递给调用的函数之前终止遍历
如果要提前终止,必须把forEach()方法放在一个try块中,并能抛出一个异常.
 */
function foreach(a, f, t) {
    try { a.forEach(f, t); } catch (e) {
        if (e === foreach.break) return;
        else throw e;
    }
}
foreach.break = new Error("StopIteration")

/*
map() 方法调用数组的每个元素传递给指定的函数,并返回一个数组,它包含该函数的返回值;
 */
var a = [1, 2, 3];
b = a.map(function(x) {
    return x * x;
});
console.log(b);

/*
filter() 方法返回的数组元素是调用数组的一个子集
 */
var a = [5, 4, 3, 2, 1];
var smallValues = a.filter(function(x) {
    return x < 3;
});
console.log(smallValues);

var everyOthers = a.filter(function(x, i) { //元素值   元素的索引
    console.log(x);
    console.log(i);
    return x % 2 == 0;
});
console.log(everyOthers);

/*
every()和some() 方法是数组的逻辑判定: 它们对数组元素应用指定的函数进行判定
注意: 一旦确认返回值它们就会停止遍历.
 */
a = [1, 2, 3, 4, 5];
var flag = a.every(function(x) {
    return x < 10;
});
console.log(flag); // 所有值 < 10

var flag = a.some(function(x) {
    return x % 2 === 0;
});
console.log(flag);

/*
reduce()和reduceRight() 方法使用指定的函数将数组元素进行组合,生成单个值. reduceRight()从右往左遍历
第一个参数: 执行化简操作的函数
第二个参数: (可选) 传递给函数的初始值
 */

var a = [1, 2, 3, 4, 5];
var sum = a.reduce(function(x, y) {
    return x + y
}, 0);
console.log(sum);
var reduce = a.reduce(function(x, y) {
    return x * y
}, 1);
console.log(reduce);
var max = a.reduce(function(x, y) {
    return x > y ? x : y;
});
console.log(max);


/*
indexOf()和lastIndexOf() 搜索整个数组具有给定值的元素, 返回找到的第一个元素的索引,如果没有就返回 -1 
 */
function findAll(a, x) {
    var results = [];
    len = a.length;
    pos = 0;
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;
        results.push(pos);
        pos = pos + 1;
    }
    return results;
}