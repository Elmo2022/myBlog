### promise处理请求超时问题

要用到promise.race()方法，直接上代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>promise处理超时问题</title>
</head>
<body>
   <script>
   function fetchData(){
       return new Promise((resolve,reject)=>{
           setTimeout(()=>{
               resolve('已经获取到数据了')
           },3000)
       })
   }
   function timeout(promise,ms){
    const timeOutPromise = new Promise((resolve,reject)=>{
        const timeout = setTimeout(()=>{
            clearTimeout(timeout)
            reject(new Error("请求超时"));
        },ms)

    })
    return Promise.race([promise,timeOutPromise])
   }
//通过设置超时定时器的超时时间来判断请求是否超时
   timeout(fetchData(),3100).then(res=>{
       console.log(res)
   }).catch(err=>{
       console.log(err)
   })

   </script> 
   
</body>
</html>
```

### Promise的9个方法

> 学习一下Promise的方法

#### Promise.resolve()

 这个Promise对象的静态方法，用于创建一个成功状态的Promise对象，可以之间在.then的成功回调中，获取resolve的值。

```javascript
const p = Promise.resolve("成功");
p.then((res) => {
  console.log("----打印：", res); //----打印： 成功
});
 
const p1 = new Promise((resolve, reject) => {
  resolve("成功");
});
p1.then((res) => {
  console.log("----打印：p1", res); //----打印：p1 成功
});
 
```



#### Promise.reject()

这个方法跟Promise.resolve一样，但是是属于拒绝的状态；可以直接在.then的失败回调中，获取reject的值；也可以在.catch中获取；如果两者同时出现代码中，看看是catch写在前面还是.then函数写在前面 ---业务中，拒绝状态用.then去执行回调，异常用.catch。

```javascript

const p1 = new Promise((resolve, reject) => {
  reject("失败");
});
p1.then(
  (res) => {
    console.log("----打印：p1", res); //不执行
  },
  (rej) => {
    console.log("----打印：p1", rej); //----打印：p1 失败
  }
);

```



#### Promise.then()

 函数回调执行，常用于接收请求接口返回的数据；该回调函数有两个参数（函数），一个是用于处理 Promise 解决时的回调函数，另一个是可选的用于处理 Promise 拒绝（rejected）时的回调函数；用于接收promise对应状态的数据。而且.then的返回值也是个promise对象。

#### 

```javascript
const p = new Promise((resolve, reject) => {
  resolve("成功");
});
const result = p.then(
  (res) => {
    console.log("----打印：p", res); //----打印：p 成功
   
  },
  (rej) => {
    console.log("----打印：p", rej); //不执行
  }

```



#### Promise.catch()

用于注册在 Promise 对象拒绝（rejected）时的回调函数。同时也可以用来捕获代码异常或者出错；

1、像如果promise是一个reject的状态或者抛出异常或者错误，既可以在.then函数中的第二个参数获取，也可以在.catch中的函数中获取。

 2、.then中产生异常能在.catch 或者下一个.then中捕获。.then和.catch本质上是没有区别的， 需要分场合使用;一般异常用.catch。拒绝状态用.then。

3、而且，一旦异常被捕获，则未执行后面中的.then不管多少，都不会执行。一般最好用.catch 在最后去捕获，这样能捕获到上面最先报错的信息。

```javascript

const p = new Promise((resolve, reject) => {
  reject("拒绝");
  console.log("----打印："); //会输出
  throw new Error("抛出错误"); //这一句改变promise状态，因为状态已经决定了
});
p.catch((error) => {
  console.log(error); // ：--拒绝
})

```

#### Promise.all()

 Promise.all接收一个promise对象的数组作为参数，当这个数组里面的promise对象，没有出现rejected状态，则会一直等待所有resolve成功后，才执行.then这个回调，如果有一个是rejected状态，则会先执行.all里面的.then中第二个回调函数或者.catch函数，不会等后续跑完你在执行。**传递给Promise.all的 promise并不是一个个的顺序执行的，而是同时开始、并行执行的。**

```javascript

var p1 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    resoleve("p1--3000");
  }, 3000);
});
var p2 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    resoleve("p2--1000");
  }, 1000);
});
var p3 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    console.log("----打印：看看是先执行失败，还是全部执行完再catch");
    resoleve("p3--5000");
  }, 5000);
});

 var promiseArr = [p1, p2, p3];
 console.time("promiseArr");
  Promise.all(promiseArr)
    .then((res) => {
      console.log("res", res); //res [ 'p1--3000', 'p2--1000', 'p3--5000' ]
      console.timeEnd("promiseArr"); // promiseArr: 5.020s
    })
    .catch((err) => console.log(err));

```



#### Promise.any()

  Promise.any接收一个promise的数组作为参数，只要其中有一个Promise成功执行，就会返回已经成功执行的Promise的结果；若全部为rejected状态，则会到最后的promise执行完，全部的promise返回到异常函数中；可用于多通道获取数据，谁先获取就执行下一步程序，跳出这个过程。

> 注意是返回第一个成功执行的promise结果！

![image-20240901203117401](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202409012031502.png)

#### Promise.race()

方法接收的参数和.all、.any接收的参数一样，接收一个可迭代promise对象的数组，**当任何一个promise的状态先确定（拒绝或者成功），则会执行.race中的回调函数**，具体根据promise的状态 ---和allSettled效果互斥。

```javascript

var p1 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    console.log("----打印：p1");
    resoleve("p1--3000");
  }, 3000);
});
 
let p2 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    reject("p2--1000");
  }, 1000);
});
 
Promise.race([p1, p2])
  .then((res) => {
    console.log("----打印：res", res);
  })
  .catch((err) => {
    console.log("----打印：err", err);
  });
 
//执行结果
//----打印：err p2--1000
//----打印：p1

```



#### Promise.allSettled()

 该方法参数也是和.all相同；顾名思义，这个方法是等所有promise参数确定状态后，才会执行回调函数，不管是成功的状态还是拒绝的状态，都等待全部执行后，并返回一个包含每个 Promise 解决状态的对象数组，每个对象包含两个属性：status 和 value；state表示promise的状态：resolve和rejected，value代表的是promise传递的值。

```javascript
var p1 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    console.log("----打印：p1");
    resoleve("p1--3000");
  }, 3000);
});
 
let p2 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    reject("p2--1000");
  }, 1000);
});
 
let p3 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    resoleve("p3--500");
  }, 500);
});
 
let p4 = new Promise((resolve, reject) => {
  throw new Error("抛出错误");
});
 
Promise.allSettled([p1, p2, p3, p4])
  .then((result) => {
    console.log("----打印：result", result);
  })
  .catch((err) => {
    console.log("----打印：", err); //不执行
  });
 
//执行结果
// ----打印：p1
// ----打印：result [
//   { status: 'fulfilled', value: 'p1--3000' },
//   { status: 'rejected', reason: 'p2--1000' },
//   { status: 'fulfilled', value: 'p3--500' },
//   {
//     status: 'rejected',
//     reason: Error: 抛出错误
//   }
// ]
```



#### Promise.finally()

Promise.finally方法的回调函数不接受任何参数 这表明，finally方法里面的操作，应该是与Promise状态无关的，无论 Promise 的状态如何，onFinally 回调都会被执行。它不接收任何参数，也没有返回值。这意味着它主要用于清理和最终处理逻辑，而不关心 Promise 的解决结果或拒绝原因。

```javascript

var p1 = new Promise((resoleve, reject) => {
  setTimeout(() => {
    resoleve("p1--3000");
  }, 3000);
});
 
p1.then((res) => {
  console.log("----打印：", res);
}).finally(() => {
  console.log("----打印：调用了");
});
 
// //执行结果
// // ----打印： p1--3000

```


