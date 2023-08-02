/*
 * @Author: your name
 * @Date: 2023-08-02 09:33:49
 * @LastEditTime: 2023-08-02 10:07:18
 * @LastEditors: FujiSan
 * @Description: In User Settings Edit
 * @FilePath: \javascriptAlgorithm\迭代器-迭代对象\index.js
 */

// 迭代器  必须 里面要有个 done它的值是 Boolean类型，还有个value
// 当 done 是true时候  value  存在值  
// 当 done 是 false  时候   value为 undefined 

let names = ['abc', 'cba', 'nba'], i = 0;
obj = {
  next() {
    if (i < names.length) {
      return {
        done: false,
        value: names[i++]
      }
    } else {
      return {
        done: true,
        value: undefined
      }
    }
  }
}
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())
// console.log(obj.next())


// 什么是迭代对象 迭代对象 是 里面有个属性 [Symbol.iterator](是个函数) 迭代对象抛出的是个迭代器
let objs = {
  arr: [23, 45, 67, 89, 90],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.arr.length) {
          return {
            done: false,
            value: this.arr[index++]
          }
        } else {
          return {
            done: true,
            value: undefined
          }
        }
      }
    }
  }
}
// let arr=objs[Symbol.iterator]()
// console.log(arr.next())
// console.log(arr.next())
// console.log(arr.next())
// console.log(arr.next())
// console.log(arr.next())
// console.log(arr.next())
// console.log(arr.next())
// console.log(arr.next())

for(let key of objs){
  console.log(key)
}