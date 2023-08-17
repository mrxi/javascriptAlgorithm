// // 第一种方式  导出方式
// export const name='席伟蛟'
// export const age=18
// export function foo(){
//     console.log('foo function')
// }


// 第二种 导出方式

// const name='席伟蛟'
// const age=18
//  function foo(){
//     console.log('foo function')
// }

// export {
//     name,
//     age,
//     foo
// }

// 第三种 起别名 导出
const name = '席伟蛟'
const age = 18
function foo() {
    console.log('foo function')
}
export {
    name as Dname,
    age as Dage,
    foo as Dfoo
}