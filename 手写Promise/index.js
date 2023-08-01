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
            queueMicrotask(() => {
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
        const onResfn = (value) => { return value }
        const onRejfn = (value) => { throw value }
        onRes = onRes || onResfn
        onRej = onRej || onRejfn
        let promise2 = new myPromise((res, rej) => {
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
                    fun(onRes, this.statusResValue, res, rej)
                    // try {
                    //     const value = onRes(this.statusResValue)
                    //     console.log(value, 'value')
                    //     res(value)
                    // } catch (err) {
                    //     rej(err)
                    // }
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

        return promise2

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



