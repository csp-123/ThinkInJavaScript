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