// function fun() {
//     let ags=[...arguments]
//     console.log(ags)
//       let res=function (){
//         ags.push(...arguments)
//         return res
//       }

//       res.toString=function(){
//       return ags.reduce((a,b)=>{
//                 return  a+b
//         })
//       }
//       return res
// }

// console.log(fun(2)(3)(4),
// fun(2,4,5,6,7)(3)(4))
// // fun(2,3,4,5)
    function fnc(n,m,z,x,y){
         console.log(n,m,z,x,y)
    }
    let arr=[]
   function fn(){
    arr.push(...arguments)
        if(arr.length>=fnc.length){
         fnc(...arr)
        }else{
         return fn
        }
   }
console.log(  fn(2)(3)(4,5)(6,7,8))
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);
 
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };
 
    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }
    return _adder;
}
 
// console.log(fun(1, 2, 3)(4)  )                 // 6
          // 10
// fun(1)(2)(3)(4)(5)          // 15
add(2, 6)(1)        