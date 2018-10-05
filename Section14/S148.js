/* 假定文档中有 <iframe id = 'f1'> */
var iframeElement = document.getElementById("f1");

// <iframe>的元素有contentWindow属性, 引用搞窗体的Window对象, 
// 所以该窗体的Window对象就是
var childFrame = document.getElementById("f1").contentWindow;

var elt = document.getElementById("f1");
var win = elt.contentWindow;
win.frameElement === elt; // 对于帧来说永远是true
window.frameElement === null; // 对于顶级窗口来说永远是true


/**
 * 每个Window对象都有一个frames属性, 它引用自身包含的窗口或窗体的子窗体.
 * 要引用窗体的第一个子窗体, 可以用frames[0]. 要引用第二个子窗体的第三个子窗体 frames[1].frames[2]
 * 要引用兄弟窗体parent.frames[1]. 注意frames[]数组中的元素都是Window对象, 而不是<iframe>元素
 */

/**
 * 14.8.3 交互窗口中的JavaScript
 */