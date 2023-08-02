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
    static all(promises) {
        let arr = []
        return new myPromise((res, rej) => {
            promises.forEach(promise => {
                promise.then((val) => {
                    // console.log(val)
                    arr.push(val)
                    if (arr.length === promises.length) {
                        res(arr)
                    }
                }, (val) => {
                    rej(val)
                })
            })
        })

    }
    static allSettled(promises) {
        return new myPromise((res, rej) => {
            let arr = []
            promises.forEach(promise => {
                promise.then((res) => {
                    arr.push({ status: statusRes, value: res })
                    if (arr.length === promises.length) {
                        res(arr)
                    }
                }, (err) => {
                    arr.push({ status: statusRej, value: err })
                    if (arr.length === promises.length) {
                        res(arr)
                    }
                })
            })

        })
    }
    static any(promises) {
        return new myPromise((res, rej) => {
            let arr = []
            promises.forEach(promise => {
                promise.then((val) => {
                    res(val)
                }, err => {
                    arr.push(err)
                    if (arr.length === promises.length) {
                        rej(new AggregateError(arr))
                    }
                })
            })
        })
    }
    static race(promises) {
        return new myPromise((res, rej) => {
            promises.forEach(promise => {
                promise.then(val => {
                    res(val)
                }, err => {
                    rej(err)
                })
            })
        })
    }
    static res(onRes) {
       return  new myPromise((res)=>{
        res(onRes)
       })
    }
    static rej(onRej){
        return  new myPromise((undefined,rej)=>{
            rej(onRej)
           })
    }
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

let a = new myPromise((res, rej) => {
    setTimeout(() => {
        res('23123')
    }, 4000)
})
let b = new myPromise((res, rej) => {
    setTimeout(() => {
        rej('啊啊啊')
    }, 2000)
})
let p = new myPromise((res, rej) => {
    setTimeout(() => {
        rej('哈哈哈哈')
    }, 3000)
})
// myPromise.race(a).then(res => {
//     console.log(res, 'res')
// }).catch(err => {
//     console.log(err, 'err')
// })
myPromise.rej(123).then(res=>{
    console.log(res,'sadsada')
}).catch(err=>{
    console.log(err,'sadas')
})
// console.log(aaa,'哇塞大大')



