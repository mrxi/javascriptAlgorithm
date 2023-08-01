let statusPedding = 'pedding'
let statusRes = 'success'
let statusRej = 'error'
function fun(fn, value, res, rej) {
    try {
        const val = fn(value)
        res(val)
    } catch (error) {
        rej(error)
    }

}
class myPromise {
    constructor(fn) {
        this.statusResValue = ''
        this.statusRejValue = ''
        this.status = statusPedding
        this.onResFns = []
        this.onRejFns = []
        let res = (value) => {
            console.log( this.onResFns,' this.onResFns')
            queueMicrotask(() => {
                console.log( this.onResFns,' this.onResFns1111')
                if (this.status === statusPedding) {
                    this.status = statusRes
                    this.statusResValue = value
                    this.onResFns.forEach(fn => {
                        fn(this.statusResValue)
                    })
                }
            })
        }
        let rej = (value) => {
            queueMicrotask(() => {
                if (this.status === statusPedding) {
                    this.statusRejValue = value
                    this.status = statusRej
                    this.onRejFns.forEach(fn => {
                        fn(this.statusRejValue)
                    })
                }
            })

        }
        try {
            fn(res, rej)
        } catch (error) {
            rej(error)
        }

    }
    then(onRes, onRej) {
<<<<<<< HEAD:手写Promise/index.js
        const onResfn = (value) => { return value }
        const onRejfn = (value) => { throw value }
        onRes = onRes || onResfn
        onRej = onRej || onRejfn
        let promise2 = new myPromise((res, rej) => {
=======
     let promise2= new myPromise((res, rej) => {
>>>>>>> 1d7c4710877ed881ef82c089d188be125af58085:原型+原型链/手写Promise/index.js
            if (this.status === statusRes && onRes) {
                fun(onRes, this.statusResValue, res, rej)
                // try {
                //     const value = onRes(this.statusResValue)
                //     console.log(value, 'value')
                //     res(value)
                // } catch (err) {
                //     rej(err)
                // }
            }
            if (this.status === statusRej && onRes) {
                fun(onRej, this.statusRejValue, res, rej)
                // try {
                //     const value = onRej(this.statusResValue)
                //     res(value)
                // } catch (err) {
                //     rej(err)
                // }


            }
            if (this.status === statusPedding) {
                this.onResFns.push(() => {
<<<<<<< HEAD:手写Promise/index.js
                    fun(onRes, this.statusResValue, res, rej)
                    // try {
                    //     const value = onRes(this.statusResValue)
                    //     console.log(value, 'value')
                    //     res(value)
                    // } catch (err) {
                    //     rej(err)
                    // }
=======
                    try {
                        console.log(this.statusResValue,'this.statusResValue')
                        const value = onRes(this.statusResValue)
                        console.log(value,'value')
                        res(value)
                    } catch (err) {
                        rej(err)
                    }
>>>>>>> 1d7c4710877ed881ef82c089d188be125af58085:原型+原型链/手写Promise/index.js
                })
            }
            if (this.status === statusPedding) {
                this.onRejFns.push(() => {
                    fun(onRej, this.statusRejValue, res, rej)
                    // try {
                    //     const value = onRej(this.statusResValue)
                    //     res(value)
                    // } catch (err) {
                    //     rej(err)
                    // }
                })
            }
        })

<<<<<<< HEAD:手写Promise/index.js
        return promise2
=======
   return     promise2
>>>>>>> 1d7c4710877ed881ef82c089d188be125af58085:原型+原型链/手写Promise/index.js

    }
    catch(err) {
        return this.then(undefined, err)
    }
    finally(onFinally) {
        this.then(onFinally, onFinally)
    }
    static all(promises){
        let arr=[]
        return new myPromise((res,rej)=>{
            promises.forEach(promise=>{
              promise.then((val)=>{
                // console.log(val)
                arr.push(val)
                if(arr.length===promises.length){
                    res(arr)
                }
              },(val)=>{
                rej(val)
              })
            })
        })

    }
    // static 
}
debugger

<<<<<<< HEAD:手写Promise/index.js
// let mypromise = new myPromise((res, rej) => {
//     res(1111)
// })
//  mypromise.then((res) => {
//     console.log('res1：', res)
//     throw '阿三大苏打'
//     // return '213213'
// }, (rej) => {
//     console.log(rej)
// }).catch(err => {
//     console.log(err, '委任为')
// })
// .finally(()=>{
//     console.log('asadasd阿三大苏打')
// })

  let a=new myPromise((res,rej)=>{
    setTimeout(()=>{
        res('23123')
    },1000)
  })
  let b=new myPromise((res,rej)=>{
    setTimeout(()=>{
        res('23123')
    },2000)
  })
  let p=new myPromise((res,rej)=>{
    setTimeout(()=>{
        rej('23123')
    },3000)
  })
  myPromise.all([a,b,p]).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
// console.log(aaa,'哇塞大大')


=======
let mypromise = new myPromise((res, rej) => {
    res(1111)
    // rej('222')
})
console.log(mypromise,'mypromise')
let promise2= mypromise.then((res) => {
    console.log('res1：', res)
    return '213213'
}, (rej) => {
    console.log(rej)
})
console.log(promise2)
let promise3= promise2.then(res => {
    console.log('res2:', res)
}, rej => {
    console.log('rej2:', rej)
})
console.log(promise3)
>>>>>>> 1d7c4710877ed881ef82c089d188be125af58085:原型+原型链/手写Promise/index.js

