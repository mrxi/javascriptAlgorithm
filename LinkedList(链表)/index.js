let a={val:'4'}
let b={val:'5'}
let c={val:'1'}
let d={val:'0'}

a.next=b
b.next=c
c.next=d
console.log(a)
var deleteNode = function(head, val) {
    let p=head;
    while(p){
       if(p.val===val){
        p=p.next
         p.next=p.next.next
       }
       p=p.next;
    }
     return head
};
deleteNode(a,'1')
// let p=a;
// let e={val:'e'}
//  c.next=e
//  e.next=d
//  c.next=d
// while (p){
//    p=p.next
//    console.log(p)
// }