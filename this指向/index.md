### 4种绑定方式 
1. 默认绑定 
```
  function fn(){
    console.log(this)
  }
  fn()//window

```
2. 隐式绑定 
```
  function fn(){
    console.log(this)
  }
  let obj={
    name:'席伟蛟',
    fn
  }
  obj.fn()//  obj
```

3.显示绑定 

```
function fn(){
    console.log(this)
  }
  let obj={
    name:'席伟蛟',
  }
fn.apply(obj)//  obj
````

4.new   绑定 
```
function fn(){
    console.log(this)
  }
     let fun= new  fn()
     fun() //fn
```
  优先级 
  ```
  new>显示绑定>隐式绑定>默认绑定 
  ```