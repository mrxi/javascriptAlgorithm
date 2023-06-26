class Prson{
     constructor(name,age){
        this.name=name;
        this.age=age
     }
        eating(){
        console.log(`我叫${this.name} 我在吃饭`)
     }
    //  static   Prson的私有方法
     static   runing(){
        console.log(`我叫${this.name} 我今年${this.age}我在跑步`)
     }
}

let  prson=new Prson('席伟蛟',18);
 class Stute extends Prson{
    constructor(name,age){
        super(name,age)
    }
    runed(){
            super.runing()
    }
}
  let stute=new Stute('席伟蛟',18)
console.log(prson.eating())
// console.log(prson.runing())  //报错 子类无法继承父类私有方法
console.log(stute.eating())  
// console.log(stute.runed())   //报错  子类无法继承父类私有方法
