## 好好学学ES6语法

### 原型和原型链



>在前端面试中，原型和原型链始终是一个避不开的问题，今天就弄明白!

#### 对象的创建方式

原型和原型链都是关于对象的内容，先来看一下JavaScript中对象的构建方式。

#### 工厂模式

```javascript
function createPerson(name, age, job) { 
 let o = new Object(); 
 o.name = name; 
 o.age = age; 
 o.job = job; 
 o.sayName = function() { 
 console.log(this.name); 
 }; 
 return o; 
} 
let person1 = createPerson("Nicholas", 29, "Software Engineer"); 
let person2 = createPerson("Greg", 27, "Doctor");
```

#### 构造函数模式

```javascript
function Person(name, age, job){ 
 this.name = name; 
 this.age = age; 
 this.job = job; 
 this.sayName = function() { 
 console.log(this.name); 
 }; 
} 
let person1 = new Person("Nicholas", 29, "Software Engineer"); 
let person2 = new Person("Greg", 27, "Doctor"); 
person1.sayName(); // Nicholas 
person2.sayName(); // Greg 
```
>要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作。
(1) 在内存中创建一个新对象。
(2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
(4) 执行构造函数内部的代码（给新对象添加属性）。
(5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

#### 原型模式

```javascript
function Person() {} 
Person.prototype.name = "Nicholas"; 
Person.prototype.age = 29; 
Person.prototype.job = "Software Engineer"; 
Person.prototype.sayName = function() { 
 console.log(this.name); 
}; 
let person1 = new Person(); 
person1.sayName(); // "Nicholas" 
let person2 = new Person(); 
person2.sayName(); // "Nicholas" 
console.log(person1.sayName == person2.sayName); // true 
```
>无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向
原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构
造函数。对前面的例子而言，Person.prototype.constructor 指向 Person。然后，因构造函数而
异，可能会给原型对象添加其他属性和方法。

#### 原型和原型链

1. Person.prototype.constructor == Person // **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
2. person01.__proto__ == Person.prototype // **准则2：实例（即person01）的__proto__和原型对象指向同一个地方**

构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。

**实例的隐式原型指向构建该实例的类的显式原型。**
验证一下这句话：
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407212240543.png)
p.__proto__===person.prototype
person.prototype.__proto__===Object.prototype
Object.prototype.__proto__===null

注意有的浏览器可能已经废除了__proto__属性，改用Object.getPrototypeOf()方法来获取对象的原型。
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407212240946.png)
原型链例子：
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407212240656.png)
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407212240338.png)

示意图:
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407212240748.png)
注意：如果通过对象自变量的方式添加新方法，会导致原型链失效
![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407212240789.png)

#### 实践

![在这里插入图片描述](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407212240128.png)

