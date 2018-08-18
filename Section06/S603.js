/**
 * 6.3 删除属性
 * delete 删除属性只是断开属性和宿主对象的联系，而不会去操作属性中的属性。
 * delete 运算符只能删除自有属性，不能删除继承属性（要删除继承属性必须从定义这个属性的原型对象上删除，这会影响到所有继承自这个原型的对象）
 */

o = { x: 1 }; //o有一个属性x，并继承属性
delete o.x; //删除x， 返回true
delete o.x; //什么都没做(x已经不存在了)，返回true
delete o.toString(); //什么也没做(toString是继承来的)，返回true
//delete 1；		//无意义，返回true


delete Object.prototype; //不能删除，属性不可配置
var x = 1;
console.log(delete this.x); //不能删除全局属性
console.log(x);

function f() {} //声明一个全局函数
console.log(delete this.f); //不能删除全局函数
console.log(f);

/**
 * 6.4 检测属性
 */
console.log("*********6.4*********")
var o = { x: 1 };
/* in 如果对象的自有属性或继承属性包含这个属性则返回true */
console.log("x" in o);
console.log("y" in o);
console.log("toString" in o);

/* hasOwnProperty只有属性是自有属性时返回true */
console.log("-------------");
console.log(o.hasOwnProperty("x"));
console.log(o.hasOwnProperty("y"));
console.log(o.hasOwnProperty("toString"));

/* propertyIsEnumerable是hasOwnProperty的增强版，该自有属性为可枚举的才返回true */
console.log("-------------");
var o = Object.create({ y: 2 });
o.x = 1;
console.log(o.propertyIsEnumerable("x"));
console.log(o.propertyIsEnumerable("y"));
console.log(o.propertyIsEnumerable("toString"));

/* !== 判断属性是否是undefined */
console.log("-------------");
var o = { x: 1 };
console.log(o.x !== undefined);
console.log(o.y !== undefined);
console.log(o.toString !== undefined);

/* in可以区分不存在的属性和存在但值为undefined */
console.log("-------------");
var o = {x: undefined};
console.log(o.x !== undefined);
console.log(o.y !== undefined);
console.log("x" in o);
console.log("y" in o);
console.log(delete o.x);
console.log("x" in o);