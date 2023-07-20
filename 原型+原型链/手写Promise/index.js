let statusPedding = 'pedding'
let statusRes = 'success'
let statusRej = 'error'

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

        fn(res, rej)
    }
    then(onRes, onRej) {
     let promise2= new myPromise((res, rej) => {
            if (this.status === statusRes && onRes) {
                try {
                    const value = onRes(this.statusResValue)
                    console.log(value,'value')
                    res(value)
                } catch (err) {
                    rej(err)
                }

            }
            if (this.status === statusRej && onRes) {
                try {
                    const value = onRej(this.statusResValue)
                    res(value)
                } catch (err) {
                    rej(err)
                }


            }
            if (this.status === statusPedding) {
                this.onResFns.push(() => {
                    try {
                        console.log(this.statusResValue,'this.statusResValue')
                        const value = onRes(this.statusResValue)
                        console.log(value,'value')
                        res(value)
                    } catch (err) {
                        rej(err)
                    }
                })
            }
            if (this.status === statusPedding) {
                this.onRejFns.push(() => {
                    try {
                        const value = onRej(this.statusResValue)
                        res(value)
                    } catch (err) {
                        rej(err)
                    }
                })
                // this.onRejFns.push(onRej)
            }
        })

   return     promise2

    }
}
debugger

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

