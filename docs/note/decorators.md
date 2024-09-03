# 探索 TypeScript 装饰器：增强类、方法和属性的元编程能力

在 TypeScript 的世界中，装饰器是一种特殊类型的声明，它能被附加到类声明、方法、访问器、属性或参数上。装饰器使用 `@表达式` 这种形式，其中 `表达式` 求值后必须为一个函数，它会在运行时被调用，被装饰的信息作为参数传入。

## 什么是装饰器？

装饰器提供了一种方式，可以在不修改类文件的情况下，给类添加额外的功能。这使得装饰器成为元编程的一种工具，元编程是指编写操作代码的代码。

## 装饰器的类型

- **类装饰器**：添加到类声明上。
- **方法装饰器**：添加到方法上。
- **访问器装饰器**：添加到 getter/setter 上。
- **属性装饰器**：添加到属性上。
- **参数装饰器**：添加到参数上。

## 装饰器的语法

在 TypeScript 中，装饰器使用 `@` 符号和函数调用来实现。装饰器可以带参数，也可以不带参数。

### 类装饰器

```typescript
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new property";
  };
}

@classDecorator
class MyClass {}
```

### 方法装饰器

```typescript
function methodDecorator(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("Before");
    const result = originalMethod.apply(this, args);
    console.log("After");
    return result;
  };
  return descriptor;
}

class MyClass {
  @methodDecorator
  myMethod() {
    console.log("Method invoked");
  }
}
```

### 属性装饰器

```typescript
function propertyDecorator(target: any, propertyKey: string | symbol) {
  let value = target[propertyKey];
  target[propertyKey] = () => {
    console.log(`Getting value: ${value}`);
    return value;
  };
}

class MyClass {
  @propertyDecorator
  myProperty = "Hello, World!";
}
```

### 参数装饰器

```typescript
function parameterDecorator(target: any, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`Parameter decorator called.`);
}

class MyClass {
  myMethod(@parameterDecorator param: string) {
    console.log(param);
  }
}
```

## 使用装饰器的注意事项

1. **启用装饰器**：在 `tsconfig.json` 中，需要设置 `"experimentalDecorators": true` 来启用装饰器。
2. **装饰器工厂**：装饰器可以是不带参数的函数，也可以是带参数的工厂函数，后者可以返回装饰器函数。
3. **装饰器顺序**：装饰器的执行顺序是从下往上，即先执行离声明最近的装饰器。

## 装饰器的实际应用

装饰器可以用于日志记录、性能监控、依赖注入、数据校验等多种场景。它们提供了一种灵活的方式来增强类和成员的功能。

## 结论

装饰器是 TypeScript 中一个强大的特性，它允许开发者以声明式的方式增强代码。通过使用装饰器，我们可以在不改变原有逻辑的情况下，为类、方法和属性添加额外的行为。随着装饰器在 TypeScript 中的进一步发展，我们可以期待它们在现代 JavaScript 应用程序中扮演越来越重要的角色。

> 有点像设计模式中的适配器模式，满足开闭原则。

## 参考资源

- [TypeScript 官方文档 - 装饰器](https://www.typescriptlang.org/docs/handbook/decorators.html)

