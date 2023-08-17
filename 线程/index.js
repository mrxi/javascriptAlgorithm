// js是单线程，但是浏览器是多线程，比如在执行一段代码时候，如果遇见 setTimeout,或者 queueMicrotask ，Promise
// 就会交给其他线程，比如 遇见 setTimeout(()=>{console.log('asdaasd')},1000)  就会把 ()=>{console.log('asdaasd')} 交给其他线程，当一秒时间到了
// 就会把这个函数 ()=>{console.log('asdaasd')} 塞进 事件队列中，事件队列分为两种 宏任务跟微任务  宏任务存放的是 定时器 操作dom的回调函数 ，还有
// ajax，  微任务 则就是 queueMicrotask，还有 Promise。then回调
// 但是 宏任务执行的条件是 等微任务 全部执行 完成 才会执行
// 这里就会形成闭环，也就是事件循环 其他线程到时间了，把需要执行的加入到宏任务队列中，或者加入微任务队列中，当同步任务执行完成之后，
// 先把 微任务队列中的加入到主线程开始执行，执行完成之后会把宏任务加入主线程开始执行

// Promise执行机制  如下示例


Promise.resolve().then(()=>{
    console.log(1)
    // return  4
    // return {
    //     then(resolve){
    //         resolve(4)
    //     }
    // }

    return Promise.resolve(4)
}).then(res=>{
    console.log(res)
})

Promise.resolve().then(()=>{
    console.log(2)
}).then(()=>{
    console.log(3)
}).then(()=>{
    console.log(5)
}).then(()=>{
    console.log(6)
}).then(()=>{
    console.log(7)
})


// 如果 Promise.resolve().then()中 return 一个基本类型的 则 执行 结果就是 
// // 1,2,4,3,5,6,7
// 如果 Promise.resolve().then()中 return thenable的值  则执行结果是
// 1,2,3,4,5,6,7
// 如果 Promise.resolve().then()中 return Promise.resolve()  则执行结果是
// 1,2,3,5,4,6,7

// 口诀 return  普通值 不后移  return thenable的值 后移一位， return Promise.resolve()后移2位