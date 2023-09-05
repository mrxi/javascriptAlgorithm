function throttle(fn, time, isShow = false, next = false) {
   let firstTime = 0,Timer=null;
   const _throttle = function () {
      const nowTime = new Date().getTime()
      if (!firstTime && isShow) {
         firstTime = nowTime
      }
      const lastTime = time - (nowTime - firstTime)
      if (lastTime <= 0) {
         if(Timer){
            clearTimeout(Timer)
            Timer=null
         }
         fn()
         firstTime = nowTime
      }

      if (next&&!Timer) {
         Timer=  setTimeout(() => {
            fn()
            Timer=null
            firstTime= !next? 0:new Date().getTime()
         }, lastTime)
      }

   }
   return _throttle
}