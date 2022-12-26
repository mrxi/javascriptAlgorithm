### 什么是链表

    增加非首位元素，不需要移动元素，只需要更改 next指针即可

因为 javascript 中不存在 链表 我们可以用 Object 模拟出来一个链表

```
let a={val:'a'}
let b={val:'b'}
let c={val:'c'}
let d={val:'d'}
a.next=b
b.next=c
c.next=d
```

接下来我们就实现链表

```
let p=a;
while (p){
   p=p.next
   console.log(p)
}
```

- 1 实现 某个位置插入

```let e={val:'e'}
 c.next=e
 e.next=d
```

- 2 实现 某个位置删除
  c.next=d

````// 链表
class Node {
 constructor(element) {
   this.element = element;
   this.next = null;
 }
}
class LinkedList {
 constructor() {
   this.heard = null;
   this.size = 0;
 }
 //添加
 apped(element) {
   let node = new Node(element);
   if (this.heard === null) {
     this.heard = node;
   } else {
     let current = this.getNode(this.size - 1);
     current.next = node;
   }
   this.size++;
 }
 //删除
 removeAt(index) {
   if (index < 0 || index > this.size) {
     throw new Error("错误");
   }
   if (index === 0) {
     this.heard = this.heard.next;
   } else {
     let pre = this.getNode(index - 1);
     pre.next = pre.next.next;
   }

   this.size--;
 }
 appendAt(index, element) {
   let node = new Node(element);
   if (index < 0 && index > this.size) {
     throw new Error("错误");
   }
   if (index === 0) {
     node.next = this.heard;
     this.heard = node;
   } else {
     let current = getNode(index - 1);
     node.next = current.next;
     current.next = node;
   }

   this.size++;
 }
 getNode(index) {
   if (index < 0 || index >= this.size) {
     throw new Error("错误");
   }
   let current = this.heard;
   for (let i = 0; i < index; i++) {
     current = current.next;
   }
   return current;
 }
}
let list = new LinkedList();
list.apped("1");
list.apped("2");
list.apped("3");
list.apped("4");
list.removeAt(1)
console.dir(list) 
````
