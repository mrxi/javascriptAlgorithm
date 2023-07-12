

// promise一共有三种状态 等待  成功 失败



 //如果Promise状态接收的是一个普通字符串或者数字就会返回
 new Promise((res,rej)=>{
   
    res('1111')
 }).then(res=>{
    console.log(res)
 }).catch(err=>{
    console.log(err)
 })
 //如果Promise状态接收的是一个普通对象也会直接返回
 new Promise((res,rej)=>{
   let obj={
    name:'席伟蛟',
    age:18
   }
    res(obj)
 }).then(res=>{
    console.log(res)
 }).catch(err=>{
    console.log(err)
 })



 //如果一个新的promise中接收的是一个Promise实例,那么 要等接收的Promise状态改变后才会去执行 它自身的.then或者catch方法
let promise= new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('啊啊啊啊')
    },1000)
 })
 
 new Promise((res,rej)=>{
    res(promise)
 }).then(res=>{
    console.log(res)
 }).catch(err=>{
    console.log(err)
 })


 //如果Promise状态接收的是一个对象 它里面还有.then方法 那么 当执行这个Promise.then的时候 就会触发对象里面的.then方法
 new Promise((res,rej)=>{
    let obj={
        then(){
            console.log('hhhhhhh')
        }
    }
    res(obj)
 }).then(res=>{
    console.log(res)
 }).catch(err=>{
    console.log(err)
 })

  new  Promise((res,rej)=>{
    res('1')
  }).then((res)=>{
     return '222'    //如果.then里面 继续return '222'   那么 这里就是隐式创建一个new Promise((res,rej)=>{  res('222')}) 在下一个 .then接收   
  }).then(res=>{
    console.log(res)
  })


  new  Promise((res,rej)=>{
    res('1')
  }).then((res)=>{
     return promise    //如果.then里面 继续return 一个promise   那么 这里就是隐式创建一个new Promise((res,rej)=>{  res(promise)}) 等 res里面的pomise状态成为 成功 会在下一个.then中接收 
  }).then(res=>{
    console.log(res)
  })
  


  new  Promise((res,rej)=>{
    res('1')
  }).then((res)=>{
     throw new Error('阿达是的')     //如果创建的Promise返回的是一个成功状态 在.then中抛出错误 那么在.catch终究会接收到错误 
  }).catch(res=>{
    console.log(res)
  })
 

  new  Promise((res,rej)=>{
    rej('报错了')
  }).then((res)=>{
     throw new Error('阿达是的')     //如果创建的Promise返回的是一个就是错误 那么它会先收集第一个promise出现在的错误   如果没有的话  .then中存在错误的话 那么就会收集 .then中的错误
  }).catch(res=>{
    console.log(res)
  })