/**
 * 6.5 枚举属性
 */
var o = { x: 1, y: 2, z: 3 };
console.log(o.propertyIsEnumerable("toString")); //false 不可枚举
for (p in o) {
    console.log(p);
    console.log(delete o[p]);
    console.log(o[p]);
    console.log(o.hasOwnProperty(p));
    console.log(p in o);
}


console.log("------------工具方法-------------");
/**
 * 把p中的可枚举属性复制到o中，并返回o
 * 如果o和p含有同名属性，则覆盖o中的属性
 * 这个函数并不处理getter和setter以及复制属性
 * @param  {[type]} o [description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
}
/**
 * 将p中可枚举属性复制到o中，并返回o
 * 如果o和p有同名属性，o中的属性将不受影响
 * 这个属性并不处理getter和setter以及复制属性
 * @param  {[type]} o [description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function merge(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty[prop]) continue;
        o[prop] = p[prop];
    }
    return o;
}
/**
 * 如果o中的属性在p中没有同名属性，则从o中删除这个属性
 * @param  {[type]} o [description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function restrict(o, p) {
    for (prop in o) {
        if (!(prop in p)) delete o[prop];
    }
    return o;
}
/**
 * 如果o中属性在p中存在同名属性，则从o中删除这个属性
 * @param  {[type]} o [description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function subtract(o, p) {
    for (prop in p) {
        delete o[prop];
    }
    return o;
}
/**
 * 返回一个新对象，这个对象拥有同时在o和p中出现的属性
 * 如果o和p有重名属性，则使用p中的属性值
 * @param  {[type]} o [description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function union(o, p) {
    return extend(extend({}, o), p);
}
/**
 * 返回一个新对象，这个对象拥有同时在o和p中出现的属性
 * 求o和p的交集，但p中的属性被hulue
 * @param  {[type]} o [description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
function intersection(o, p) {
    return restrict(extend({}, o), p);
}
/**
 * 返回一个数组，这个数组返回o中可枚举自有属性的名字
 * @param  {[type]} o [description]
 * @return {[type]}   [description]
 */
function keys(o) {
    if (typeof o !== "object") throw TypeError();
    var result = [];
    for (var prop in o) {
        if (o.hasOwnProperty(prop))
            result.push(prop);
    }
    return result;
}

function toString(o) {
    var str = '{';
    for (prop in o) {
        if (str !== '{') {
            str += ', '
        }
        str += prop;
        str += ':';
        str += o[prop];
    }
    str += '}';
    return str;
}

console.log("------------test----------");
var a = { x: 1, y: 2, z: 3 };
var b = { x: 1, y: 2 };
console.log(toString(a));
console.log(toString(b));
subtract(a, b);
console.log(a["z"]);
delete a["z"];
console.log(toString(a));
console.log(toString(b));