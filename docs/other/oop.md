# OOP

对象自己的方法调用自己的属性需要用this

```js
    var person = {
        name: 'cheng',
        age: 11,
        gender: "man",
        intr: function () {
            console.log("I'm"+ this.name +", I'm"+ this.age)
        }
    }
    person.name
    person.age ++
    person.intr()
    person['name']
```

***对象的本质是关联数组*** 数组 不限制元素个数，随意添加

```js
    function clone (obj) {
        if (Object.prototype.toString.call(obj) !== "[object Object]") return
        var cloneObj = {}
        for (var key in obj) {
            if (obj[key] !== undefined) {
                cloneObj[key] = obj[key]
            }
        }
        return cloneObj
    }
    clone(person)
```

## 封装

## 继承

+ 原型链继承 (本质重写原型对象)

***节约内存，做到代码重用***

如何：</br>

原型对象(prototype/ __proto__)

## 多态

------

```js
    // IE8 不支持indexOf  shim
    if (Array.prototype.indexOf === undefined) {
        Array.prototype.indexOf = function (val, fromi) {
            !fromi && (fromi = 0)
            for (; fromi < this.length; fromi++ ) {
                if (this[fromi] === val) return fromi
            }
            return -1
        }
    }
```