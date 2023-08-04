/*
 * @Author: your name
 * @Date: 2023-08-04 10:40:59
 * @LastEditTime: 2023-08-04 10:59:45
 * @LastEditors: FujiSan
 * @Description: In User Settings Edit
 * @FilePath: \javascriptAlgorithm\生成器\index.js
 */
   
// 如果 在一个函数执行重你想控制 它 在哪里需要等待 此时 我们就需要用的 生成器

// function fn (){
//   const value1=100;
//   console.log('Value1:',value1)
//   const value2=200;
//   console.log('Value2:',value2)
//   const value3=300;
//   console.log("Value3:",value3)
// }
// fn()
// 此时函数执行 我们是无法让它 在某一位置 暂停所以 此时我们就要用到 生成器

function * fun(num){
  const value1=100*num;
  console.log('Value1:',value1)
 const n= yield value1
  const value2=200*n;
  console.log('Value2:',value2)
  yield value2
  const value3=300;
  console.log("Value3:",value3)
  yield  value3
  console.log('执行完毕')
}

// 上面的函数会返回一个生成器
   let generator =fun(8)
   console.log(generator.next())
   console.log(generator.next(10))
   console.log(generator.next())
  //  也可以传值
  /**
   *  generator =fun(2)传的参数 在第一个yield之前接受
   * generator.next(10)  传的值则需要在第一个yield返回
   * yield  后面跟 就是 类似于 return 效果
   * 
   *  
   */
  //  console.log(generator.next())
  generator.return(10)
  generator.throw(50)

