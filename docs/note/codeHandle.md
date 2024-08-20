***\*数组去重\****

1、使用filter

```javascript
const myRemove_filter = (arr) => {

 return arr.filter((value, index, array) => {

  return array.indexOf(value) === index

 })

}
```

2、ES6拓展运算符

```javascript
const myRemove_ES6 = (arr) => {

 return [...new Set(arr)]

}
```

 

***\*数组扁平化\****

1、递归

```javascript
const myFlatten_recursion = (arr) => {

 result = []

 for (const item of arr) {

  if (Array.isArray(item)) {

   result = result.concat(myFlatten_recursion(item))

  } else {

   result.push(item)

  }

 }

 return result

}
```

2、ES6拓展运算符

```javascript
const myFlatten_ES6 = (arr) => {

 while (arr.some((item) => Array.isArray(item))) {

  arr = [].concat(...arr)

 }

 return arr

}
```

 

***\*手写instanceof\****

调用Object.getPrototypeOf方法从下往上获取obj的属性判断。

```javascript
function myInstanceof(obj, type) {

 let objPrototype = Object.getPrototypeOf(obj)

 while (objPrototype) {

  if (objPrototype === type) {

   return true

  } else {

   objPrototype = Object.getPrototypeOf(objPrototype)

  }

 }

 return false

}
```

 

***\*手写new\****

1、创建一个obj对象

2、让obj对象的__proto__属性等于fn的prototype

3、调用fn，指定上下文是obj

4、如果fn得到结果是一个对象就返回结果，不然返回obj

```javascript
function myNew (fn, ...args) {

 if (typeof fn !== 'function') {

  throw new TypeError('fn must be a function!')

 }

 let obj = null

 obj.__proto__ = fn.prototype

 const result = fn.apply(obj, args)

 return result instanceof Object ? result : obj

}
```

 

***\*手写浅拷贝\****

如果是基础数据类型直接返回，如果是引用数据类型就使用for in获取对象的键添加到新对象上。

```javascript
function shallowCopy (obj) {

 if (!obj || typeof obj !== 'object') {

  return obj

 }

 const newObj = Array.isArray(obj) ? [] : {}

 for (const key in obj) {

  if (obj.hasOwnProperty(key)) {

   newObj[key] = obj[key]

  }

 }

 return newObj

}
```

 

***\*手写深拷贝\****

和浅拷贝相比，在添加键时，如果值是对象就添加这个对象的深拷贝。

```javascript
function deepCopy (obj) {

 if (!obj || typeof obj !== 'object') {

  return obj

 }

 const newObj = Array.isArray(obj) ? [] : {}

 for (const key in obj) {

  if (obj.hasOwnProperty(key)) {

   newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]

  }

 }

 return newObj

}
```

 

***\*手写call\****

可以通过this拿到要调用的函数，为传进来的上下文添加上这个函数并调用，最后删掉再返回结果。call传进来的参数是可变参数，需要用...接收。

```javascript
Function.prototype.myCall = function (thisArg, ...args) {

 thisArg.fn = this

 let res = thisArg.fn(...args)

 delete thisArg.fn

 return res

}

 
```

***\*手写apply\****

和call相似，就是传进来的参数直接就是数组了。

```javascript
Function.prototype.myApply = function (thisArg, args) {

 thisArg.fn = this

 let res = thisArg.fn(...args)

 delete thisArg.fn

 return res

}
```

 

***\*手写bind\****

返回的是一个函数，直接通过this得到要调用的函数，通过this.call或者this.apply将上下文传进去就行了。

```javascript
Function.prototype.myBind = function (thisArg, ...args1) {

 return function (...args2) {

this.call(thisArg, ...args1, ...args2)

// this.apply(thisArg, [...args1, ...args2])

 }

}
```

 

***\*函数柯里化\****

就是判断现在的参数个数是不是比原函数的多，如果大于等于原函数，直接返回结果，否则返回一个curry函数。

```javascript
function curry (fn, ...args) {

 const len = fn.length

 return function (...args2) {

  const newArgs = [...args, ...args2]

  if (newArgs.length >= len) {

   return fn.apply(this, newArgs)

  } else {

   return curry(fn, ...newArgs)

  }

 }

}
```

 

***\*手写防抖\****

防抖就是一段时间内来了好多请求，以最后一次的计时为准。

如果来了一个请求，并且现在还存在定时器，就将这个定时器清除并重新开启一个定时器。

```javascript
function myDebounce (fn, wait) {

 let timer = null

 return function (...args) {

  let _this = this

  if (timer) {

   clearTimeout(timer)

   timer = null

  }

  timer = setTimeout(() => {

   fn.apply(_this, args)

  }, wait);

 }

}

 
```

***\*手写节流\****

节流就是一段时间内来了好多请求，以第一次的计时为准。

如果来了一个请求，并且现在还存在定时器，就直接退出。只有不存在定时器时才开启一个定时器，定时器结束清除定时器。

```javascript
function myThrottle (fn, wait) {

 let timer = null

 return function (...args) {

  let _this = this

  if (timer) {

   return

  }

  timer = setTimeout(() => {

   fn.apply(_this, args)

   timer = null

  }, wait)

 }

}
```

***\*手写promise\****

```javascript
const PENDING = 'pending'

const FULFILLED = 'fulfilled'

const REJECTED = 'rejected'

 

class MyPromise {

 constructor (executor) {

  // 状态

  this.state = PENDING

  // 成功信息

  this.value = undefined

  // 失败信息

  this.reason = undefined

  // 成功回调

  this.onResolveCallbacks = []

  // 失败回调

  this.onRejectCallbacks = []

 

  const resolve = (value) => {

   if (this.state === PENDING) {

​    this.state = FULFILLED

​    this.value = value

​    this.onResolveCallbacks.forEach(callback => callback(this.value))

   }

  }

 

  const reject = (reason) => {

   if (this.state === PENDING) {

​    this.state = REJECTED

​    this.reason = reason

​    this.onRejectCallbacks.forEach(callback => callback(this.reason))

   }

  }

 

  try {

   executor(resolve, reject)

  } catch(error) {

   reject(error)

  }

 }

 

 then (onFulfilled, onRejected) {

  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value

  onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

 

  const p2 = new MyPromise((resolve, reject) => {

   if (this.state === FULFILLED) {

​    setTimeout(() => {

​     try {

​      const x = onFulfilled(this.value)

​      resolvePromise(p2, x, resolve, reject)

​     } catch (error) {

​      reject(error)

​     } 

​    }, 0)

   } else if (this.state === REJECTED) {

​    setTimeout(() => {

​     try {

​      const x = onRejected(this.reason)

​      resolvePromise(p2, x, resolve, reject)

​     } catch (error) {

​      reject(error)

​     }

​    }, 0)

   } else {

​    this.onResolveCallbacks.push(() => {

​     setTimeout(() => {

​      try {

​       const x = onFulfilled(this.value)

​       resolvePromise(p2, x, resolve, reject)

​      } catch (error) {

​       reject(error)

​      }

​     }, 0)

​    })

​    this.onRejectCallbacks.push(() => {

​     setTimeout(() => {

​      try {

​       const x = onRejected(this.reason)

​       resolvePromise(p2, x, resolve, reject)

​      } catch (error) {

​       reject(error)

​      }

​     }, 0)

​    })

   }

  })

  return p2

 }

 

 catch (onRejected) {

  return this.then(undefined, onRejected)

 }

 

 finally (onFinally) {

  return this.then(onFinally, onFinally) 

 }

}

 

function resolvePromise(p2, x, resolve, reject) {

 if (x === p2) {

  throw new TypeError('type error')

 }

 if (x instanceof MyPromise) {

  x.then(value => resolve(value), reason => reject(reason))

 } else {

  resolve(x)

 }

}
```

 