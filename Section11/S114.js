/**
 * 11.4 迭代
 * for/each 循环和for/in 循环非常相似. (E4X规范)
 * 但for/each 并不是遍历对象的属性, 而是遍历属性的值
 */
let o = { one: 1, two: 2, three: 3 };
for (let p in o)
    console.log(p); // for/in 输出 'one' 'two' 'three'

//for each(let v in o)
//console.log(v); // for/each 输出1`3

var a = ['one', 'two', 'three'];
for (let p in a)
    console.log(p); // 输出索引 0 1 2

//for each(let v in a)
//console.log(v); // 输出 'one' 'two' 'three'


// 这个函数返回一个迭代器, 它可以迭代某个范围内的整数
function rangeIter(first, last) {
    let nextValue = Math.ceil(first);
    return {
        next: function() {
            if (nextValue > last) throw StopIteration;
            return nextValue++;
        }
    };
}


// 返回一个可迭代的对象, 用以表示该范围内的数字
function range(min, max) {
    return { // 返回一个表示这个范围的对象
        get min() { return min; }, // 范围边界固定
        get max() { return max; }, // 并在闭包内保存起来
        includes: function(x) { // 检测成员是否属于这个范围
            return min <= x && x <= max;
        },
        toString: function() { // 以字符串形式输出这个范围
            return "[" + min + "," + max + "]";
        },
        __iterator__: function() {
            let val = Math.ceil(min);
            return {
                next: function() {
                    if (val > max)
                        throw StopIteration;
                    return val++;
                }
            }
        }
    };
}
// 这里我们对这个区间中的值进行迭代
for (let i in range(1, 10)) console.log(i);

console.log("********************");

// 11.4.3 生成器
// 任何使用关键字yield的函数 (即使yield在代码逻辑中是不可达的) 都称为"生成器函数"
// 使用这个关键字必须显示指定版本为1.7
// yield和return 区别在于, 使用yield的函数 "产生" 一个可保持函数内部状态的值, 这个值是可以恢复的.

// 针对一个整数范围定义一个生成器函数
/*function range(min, max) {
    for(let i = Math.ceil(min); i <= max; i++)
        yield i;
}*/
/*for(let n in range(3, 8))
    console.log(n);*/

//[x, y] = [y, x];


/**
 * 11.4.4 数组推导
 */
let eventsquares = [x * x
    for (x in range(0, 10))
        if (x % 2) === 0
];

console.log(eventsquares);