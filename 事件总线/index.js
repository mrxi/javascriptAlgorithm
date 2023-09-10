class EventBus {
  constructor() {
    this. ThandlersBus = {}
  }
  on(eventName, eventCallBack, thisArg) {
    let handlers = this.ThandlersBus[eventName]
    if (!handlers) {
      handlers = []
      this.ThandlersBus[eventName] = handlers
    }
    handlers.push({
      eventCallBack,
      thisArg
    })
  }
  off(eventName,eventCallBack) {
    const handlers=this.ThandlersBus[eventName]
    if(!handlers) return
     let i=0;
     while(i<handlers.length){
      if(handlers[i].eventCallBack===eventCallBack){
        handlers.splice(i,1)
        continue
      }
      i++
     }
    // const newHandlers = [...handlers]
    //  for(let i=0;i<newHandlers.length;i++){
    //   const handler = newHandlers[i]
    //   if(handler.eventCallBack===eventCallBack){
    //     const index = handlers.indexOf(handler)
    //     handlers.splice(index, 1)
    //   }
    //  }
  }
  emit(eventName, ...params) {
    let handlers = this.ThandlersBus[eventName]
    if (!handlers) return
    handlers.forEach(element => {
      element.eventCallBack.apply( element.thisArg,params)
    });
  }
}


let eventBus = new EventBus()

eventBus.on('abc', function () {
  console.log('萨达')
}, { name: '席伟蛟' })
 let fn=function () {
  console.log('萨达2')
}
eventBus.on('abc',fn, { name: '席伟蛟' })
eventBus.emit('abc', 123)
// eventBus.off('abc',fn)
// 移除监听
eventBus.off("abc", fn)
eventBus.emit("abc", 123)
