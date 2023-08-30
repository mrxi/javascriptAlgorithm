var x = 0;
//如果一个函数 中的形参 是有默认值的，那么 这个形参就会形成一个作用域
此时这个函数  形成的 作用域 就是 
全局 作用域   fn函数作用域   形参作用域  （形参的作用域  会形成  Block{
    x:undefined,
    y:0xxx1
}）
函数fn执行 
先打印 undefined
然后  y函数执行 
  此时  形参形成的作用域 {
    x:3,
    y:0xxx1
  }
  打印 3  此时 fn形参x由 undefined变成 3
  fn函数执行完毕 
  全局 没变化  
function fn(x, y = function () { x = 3, console.log(x) }) {
    console.log(x)
    var x = 2;
    y()
    console.log(x)
}
fn()
console.log(x)