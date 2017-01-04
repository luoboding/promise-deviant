# promise-deviant
这是low逼版本的promise的实现，纯属闹着玩^_^
``` javascript
var p = new Promise((resolve, rejection) => {
  resolve('ok');
})
p.then((result) => {
    console.log('result');
}).catch((error) => {
    console.log('error', error)
})
```
