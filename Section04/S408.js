console.info(1 + 2);
console.info("1" + "2");
console.info("1" + 2);
console.info(1 + {});
console.info(true + true);
console.info(2 + null);
console.info(2 + undefined);

/*
3
12
12
1[object Object]
2
2
NaN
*/

console.info(1 + 2 + " blind mice");
console.info(1 + (2 + " blind mice"));

/*
3 blind mice
12 blind mice
 */

// '+' 运算符偏爱字符串   比较运算符偏爱数字
console.info(1 + 2);
console.info("1" + "2");
console.info("1" + 2);
console.info(11 < 3);
console.info("11" < "3");
console.info("11" < 3);
console.info("one" < 3);

/*
3
12
12
false
true
false
false
 */
console.info("***********in运算符**********");
// in 运算符
var point = { x: 1, y: 1 };
console.info("x" in point);
console.info("z" in point);
console.info("toString" in point);

/*
true
false
true
 */

console.info("***********instanceof运算符**********");
var d = new Date();
console.info(typeof d);
console.info(d instanceof Date);
console.info(d instanceof Object);
console.info(d instanceof Number);

var a = [1,2,3];
console.info(typeof a);
console.info(a instanceof Array);
console.info(a instanceof Object);
console.info(a instanceof RegExp);

/*
object
true
true
false
object
true
true
false
 */

