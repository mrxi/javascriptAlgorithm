let statusPedding = 'pedding'
let statusRes = 'success'
let statusRej = 'error'

class myPromise {
    constructor(fn) {
        this.statusResValue = ''
        this.statusRejValue = ''
        this. status = statusPedding
        this.onRes=undefined
        this.onRej=undefined
        let res = (value) => {
            queueMicrotask(()=>{
                if (this.status === statusPedding) {
                   this. status = statusRes
                    this.statusResValue = value
                    this.onRes(value)
                }
            })
        
        }
        let rej = (value) => {
            queueMicrotask(()=>{
                if (this.status === statusPedding) {
                    this.statusRejValue = value
                    this.status = statusRej
                    this.onRej(value)
                }
            })

        }
        fn(res, rej)
    }
    then(onRes, onRej) {
        this.onRes=onRes
        this.onRej=onRej
    }
}

let mypromise = new myPromise((res, rej) => {
    res(1111)
    rej('222')
})
mypromise.then((res) => {
    // return '213213'
    console.log(res)
}, (rej) => {
    console.log(rej)
})
// .then((res=>{
//     console.log(res)
// }))
// setTimeout(()=>{
//     mypromise.then((res) => {
//         console.log(res)
//     }, (rej) => {
//         console.log(rej)
//     })
// },1000)
