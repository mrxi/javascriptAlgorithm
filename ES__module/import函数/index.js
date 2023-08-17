
// import { name, age, foo} from './demo.js'
// console.log(name)
// console.log('啊实打实大师大')
    // import  作为函数 就会 返回一个 Promise实例,异步加载
    import('./demo.js').then(res=>{
        console.log(res)
    })
    console.log('啊实打实大师大')
