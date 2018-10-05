/**
 * 11.2 常量和局部变量
 */
const pi = 3.14;
console.log(pi);
//pi = 4; // Identifier 'pi' has already been declared
console.log(pi);


//const pi = 4; // Identifier 'pi' has already been declared
//var pi = 4; // Identifier 'pi' has already been declared


// 版本号 <script type="application/javascript; version=1.8">


function oddsums(n) {
    let total = 0,
        result = [];
    for (let x = 1; x <= n; x++) {
        let odd = 2 * x - 1;
        total += odd;
        result.push(total);
    }
    //console.log(x);
    return result;
}

console.log(oddsums(5));

console.log("**********************");
/**
 * 在声明语句中使用let和在循环变量中使用let, 两者有着有趣的区别
 * 对于前者变量的初始化表达式是在变量的作用域计算
 * 对于后者变量的初始化表达式是在变量的作用域外计算的
 *
 * 当出现两个变量同名的情况下需要尤为注意
 * @return {[type]} [description]
 */
function jububianliang() {
    let x = 1;
    for (let x = x + 1; x < 5; x++)
        console.log(x);

    {
        let x = x + 1;
        console.log(x);
    }
}
//jububianliang();


/*let x1 = 1,
    y1 = 2;
let (x1 = x1 + 1, y1 = x1 + 2) {
    console.log(x1 + y1);
};

console.log(x1 + y1);*/

/**
 * 11.3 解构赋值
 */
let [x, y] = [1, 2];
console.log([x, y]);