### 队列

什么是队列，队列就是 遵循先进先出的原则,javascript 中是没有队列的，但是我们可以用 Array 中的某些方法模拟它

```
   let arr=[];
    arr.push(1)
    arr.push(2)
    let item1=arr.shift()
    let item2=arr.shift()
```
