// Commonjs中 导入跟导出

//  第一种导出
// exports.name='席伟蛟'
// exports.age=18
// exports.sum=function(){
//     return 20+30
// }

//第二种导入
// module.exports={
//     name:18,
//     age:10,
//     sum:function(){
//        return 3-5
//     }
//    }
// 导入

// const {name,age,sum} =require('./dome')
// console.log(name,age,sum)


// require  查找规则  为什么 我们上面可以不用require('./dome.js') 

// 因为在查找过程中  先是会 查找 同级目录下 dome.js  如果没有就会继续给你拼接 dome.jon  在找不到 就是 查找 dome.node

// 如果还没有  就会 看有没有 demo文件夹 如果有 就会查找 demo/index.js || demo/index.json || demo.node

// 如果输入的是一个单词 那么他就会在
// console.log(module)
// module.path中查找每个层级里面的node_modules 
// 比如我们  引入
const  why=require('axios')
console.log(why)
// paths= [
//     'C:\\Users\\SSQ\\Desktop\\javascriptAlgorithm\\commonjs\\node_modules',
//     'C:\\Users\\SSQ\\Desktop\\javascriptAlgorithm\\node_modules',
//     'C:\\Users\\SSQ\\Desktop\\node_modules',
//     'C:\\Users\\SSQ\\node_modules',
//     'C:\\Users\\node_modules',
//     'C:\\node_modules'
//   ]