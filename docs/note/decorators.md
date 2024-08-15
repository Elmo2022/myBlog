TypeScript 中的装饰器是一种特殊类型的声明，它可以被附加到类、方法、属性或参数上。装饰器使用 `@expression` 这种形式，其中 `expression` 必须求值为一个函数，这个函数将被调用，并且它将接收有关被装饰的声明的信息。

装饰器主要有以下几种类型：

1. **类装饰器** (`@Target(装饰器目标)`): 应用于类。
2. **方法装饰器** (`@Target(装饰器目标)`): 应用于方法。
3. **访问器装饰器** (`@Target(装饰器目标)`): 应用于属性的 getter/setter。
4. **属性装饰器** (`@Target(装饰器目标)`): 应用于属性。
5. **参数装饰器** (`@Target(装饰器目标)`): 应用于参数。

装饰器可以执行以下操作：
- 读取装饰的声明的元数据。
- 可以添加、更改或删除元数据。
- 可以返回一个新函数，这个函数将替换被装饰的函数。

装饰器是在运行时执行的，这意味着它们可以用于修改类的行为，例如添加方法或属性，或者改变方法的实现。



在这里给出上面五种使用场景的代码示例：
类装饰器：

```TS
// 定义装饰器
function LogClass(target: Function) {
  console.log(`New instance of ${target.name} class created.`);
}

// 使用装饰器修饰类
@LogClass
class MyClass {
  constructor() {
    console.log("This is MyClass constructor");
  }
}

```















装饰器是 TypeScript 的一个实验性特性，需要在 `tsconfig.json` 中启用 `experimentalDecorators` 选项。

```json
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

请注意，装饰器的提案在 ECMAScript 标准中仍在讨论中，因此它们的最终形态可能会有所变化。
