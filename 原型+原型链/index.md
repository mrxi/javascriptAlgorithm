###   什么是原型 
```
每个对象都有一个隐性的原型[[prototype]],但是这是隐式的，我们看不到
let obj={}
console.log(obj.__proto__)
obj.__proto__  指向的就是原型对象

函数 也是对象 那么函数也一定存在 __proto__
function foo(){

}
console.log(foo.__proto__)
函数也会有它自己的显示原型 prototype
console.log(foo.prototype)
Object.getOwnPropertyDescriptors(foo.prototype)
我们可以看到 打印出来的结果是  {
  constructor：{
    configurable: true,  //可删除
    enumerable:false,  //可枚举
value: ƒ foo(),  
writable: true,  //可修改
  }  
}
 我们打印 foo.prototype 可以看到constructor是不可枚举的
   如果我们 要给原型链上绑定一些方法 或者属性
   foo.prototype.name='席伟蛟'
   foo.prototype.age=18
   foo.prototype.height=1.8
   foo.prototype.add=function(){
    this.age++
   }
   这样写会有点繁琐 所以我们可以重写  foo.prototype
    foo.prototype={
        name:"席伟蛟",
        age:18,
        height:1.8,
        add(){
     this.age++
        }
    }
    但是这样写的话 我们跟原来的foo.prototype相比 会少一个constructor
    所以我们为了保证跟原来一样 我们可以写上
        foo.prototype={
        name:"席伟蛟",
        age:18,
        height:1.8,
        add(){
     this.age++
        },
   Object.defineProperty(foo.prototype,{
enumerable: true,  //可枚举
  configurable: true,  //可删除 
  writable: true,  //可修改
  value: foo,
   })
```