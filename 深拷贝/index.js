function isObj(value) {
    const type = typeof value
    return value !== null && (type === 'object' || type === 'function')
}

function copy(origValue) {

    if(origValue instanceof Set){
        let set =new Set([...origValue])
        return set
    }
    if(origValue instanceof Map){
        let set =new Map([...origValue])
        return set
    }
    if( typeof origValue ==='symbol'){
       return Symbol(origValue)
    }

    if (typeof origValue === 'function') return origValue
    if (!isObj(origValue)) return origValue
    const   newObj = Array.isArray(origValue) ? [] : {}
    for (let key in origValue) {
        newObj[key] = copy(origValue[key])
    }
     let Syarr=Object.getOwnPropertySymbols(origValue)
     for(let key of Syarr){
        newObj[key]=copy(origValue[key])
     }
    //  console.log(Syarr)
    return newObj
}
   let s1=Symbol('aaaa')
   let s2 =Symbol('bbb')

let obj = {
    name: 'xwj',
    age: 18,
    info: {
        name: '席伟蛟'
    },
    arr: [123, 456, 789],
    foo() {
        console.log('asdasdsad')
    },
    set:new Set([2,3,4,5]),
    [s1]:'abc',
    s2:s2
}

// console.log(obj)
let newObj = copy(obj)
obj.name = '西静静'
console.log(newObj)