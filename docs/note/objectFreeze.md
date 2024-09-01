> 使用Object.freeze()方法可以冻结一个对象，使其不可修改。冻结对象后，不能添加、删除或修改对象的属性。

```js
const obj = {
  name: '张三',
  age: 18
}

Object.freeze(obj)

obj.name = '李四' // 修改无效
console.log(obj.name) // '张三'
```

> Object.freeze()方法会递归冻结对象的所有属性，包括嵌套对象。但是，如果对象中包含函数，函数仍然可以调用，但是不能修改函数的属性。



