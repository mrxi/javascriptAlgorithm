// 防抖就是 在固定时间内(2秒内) 如果一直触发就不会触发，只有等停止2秒后才会触发
// 某个事件，若果在此期间有停顿(达不到2秒又触发)，则下次又会重新计时，只有等到2秒后
// 才会触发一次事件
// 节流 就是 在 某一段时间内(2秒)后 就会执行一次事件，


//防抖实现
function shake(fn, time,isShow=false) {
    let Timer = null,show=false

    const _shake = function (...agr) {
        if (Timer) clearTimeout(Timer)
        if(isShow&&!show){
            fn.apply(this,agr)
            show=true
        }else{
            Timer = setTimeout(() => {
                fn.apply(this,agr)
                show=false
            }, time)
    
        }
       
    }
    return _shake
}