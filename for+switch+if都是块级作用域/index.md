```
if(false){
    var age='阿达是的'
    function add(){
        console.log(add)
    }
}
//按正常来说 在块级作用域中 var 还有函数 是外部找不到的，但是为了兼容以前的 然后让可以找到
if(true){
    var age='阿达是的'
    function add(){
        console.log(add)
    }
}
// switch 也是  
// for 循环也是
console.dir(window)
