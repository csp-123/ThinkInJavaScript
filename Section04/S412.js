var geval = eval;  //使用别名调用eval将是全局eval
var x = "global";  //两个全局变量
var y = "global";  

function f() {     //函数内执行的是局部eval
    var x = "local";
    eval("x += 'changed';");   //直接eval更改了局部变量的值
    return x;      //返回局部变量的值
}

function g() {     //函数内执行的是全局eval
    var y = "local";
    geval("y += 'changed';");   //间接调用改变了全局变量的值
    return y;      //返回未更改的局部变量
}

/*console.log(f(), x);
console.log(g(), y);*/

var a = [1,2,3];
delete a[2];
console.info(2 in a); //位置2的元素不存在
console.log(a);
/*
false
[ 1, 2, <1 empty item> ]
 */