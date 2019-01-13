# 创建对象的方法

## 1.工厂模式

## 2.构造函数模式

## 3.原型模式

## 4.组合模式

## 4.1 动态原型模式

```js
    function Person (name) {
        this.name = name 
        if (typeof this.getName !== 'function') {
            Person.prototype = {
                getName: function () {
                    console.log(this.name)
                }
            }
        }
    }
    var person1 = new Person('lilei')
    var person2 = new Person('hmm')

    // 报错 并没有该方法
    person1.getName();

    // 注释掉上面的代码，这句是可以执行的。
    person2.getName();

```