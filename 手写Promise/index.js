class myPromise {
    constructor(fn) {
        let statusPedding = 'pedding'
        let statusRes = 'success'
        let statusRej = 'error'
        this.status = 'pedding'
        this.statusResValue = ''
        this.statusRejValue = ''
        let res = (value) => {
            if (this.status === statusPedding) {
                this.status = statusRes
                this.statusResValue = value
            }
        }
        let rej = (value) => {
            if (this.status === statusPedding) {
                this.statusRejValue = value
                this.status = statusRej
            }
        }
        fn(res, rej)
    }
    then(onRes, onRej) {
        if (this.status === 'success') {
            onRes(this.statusResValue)
        }
        if (this.status === 'error') {
            onRej(this.statusRejValue)
        }
    }
}

let mypromise = new myPromise((res, rej) => {
    res(1111)
    rej('222')
})
mypromise.then((res) => {
    return '213213'
    console.log(res)
}, (rej) => {
    console.log(rej)
}).then((res=>{
    console.log(res)
}))
// setTimeout(()=>{
//     mypromise.then((res) => {
//         console.log(res)
//     }, (rej) => {
//         console.log(rej)
//     })
// },1000)
