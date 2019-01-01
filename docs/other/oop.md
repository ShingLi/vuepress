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
