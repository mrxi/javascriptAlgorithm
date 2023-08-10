/*
 * @Author: your name
 * @Date: 2023-08-08 16:45:38
 * @LastEditTime: 2023-08-08 16:57:22
 * @LastEditors: FujiSan
 * @Description: In User Settings Edit
 * @FilePath: \javascriptAlgorithm\生成器+Promise\index.js
 */
  function fn(str){
    return new Promise((res)=>{
     setTimeout(()=>{
      res(str)
     },2000)
    })
  }
  
  fn('why').then(res=>{
     fn(res+'aaa').then(res=>{
      fn(res+'bbb').then(res=>{
        console.log(res)
      })
     })
  })

  