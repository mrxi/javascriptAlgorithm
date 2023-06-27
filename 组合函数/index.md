### 组合函数

```
function add(n) {
  return (n += n);
}
function sub(m) {
  return Math.pow(m, 2);
}

function combination() {
  let args = [...arguments],
    i = 0;
  return function () {
    let res = 0;
    while (i < args.length) {
      res += args[i]([...arguments][i]);
      i++;
    }
    return res;
  };
}
console.log(combination(add, sub)(10, 20), "安全");

```