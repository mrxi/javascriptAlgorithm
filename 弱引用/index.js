let map=new Map()
let set=new Set()
let weakMap=new WeakMap()
let weakSet=new WeakSet()

/**
 * map，set属于强引用，什么是强引用，什么是弱引用
 * let obj={
 * name:'席伟蛟',
 * age:18
 * }
 * let o=obj
 * obj=null
 * 则 o不会被销毁 
 * 那么弱引用呢
 * weakMap.set(obj,'哈哈哈')
 */

let obj=[1,2,3,4]
weakMap.set(obj,'哈哈哈哈')
// set.add(obj)
// map.set(obj,'嘻嘻嘻')

const registry = new FinalizationRegistry(()=>{
  console.log('我要被回收了 ')
})
registry.register(obj)
obj=null
console.log(set.keys(obj),'hhhhhh阿三大苏打')
console.log(set.size,'hhhhhh阿三大苏打')
console.log( weakMap.get(obj),'阿三大苏打')
console.log( weakMap.size,'阿三大苏打')

// FinalizationRegistry  可以 监测数据有没有被GC回收
// 强引用就不会被回收 弱引用 就会触发它，就会出现数据回收
// 为什么 set 或者 map  .has时候会是  false，因为 obj被回收了 set
// 或者 map存储的是引用类型的地址，所以 has时候 obj指向了Null，但
// 之前 obj指向的[1,2,3,4] 还在  所以 打印是false   但是 weakMap,weakSet,
// weakRef 都是弱引用
