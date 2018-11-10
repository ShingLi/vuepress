# 组件(Components) 和 属性(Props)

## 函数式组件和类组件

```js
    function Welcome (props) {
        return (
            <h1>hello ,{props.names}</h1>
        )
    }
```

这个是一个函数式组件，接受一个props 参数，并且 返回一个react 元素，字面上看是一个函数

## 渲染一个组件

```js
    import React, { Component } from 'react'

    class Welcome extends Component {
        constructor (props) {
            super(props)
        }
        render () {
            return (
                <h1>hello, {this.props.name}</h1>
            )
        }
    }
    ReactDOM.render(
        <Welcome name= 'Jane'/>,
        docuemnt.getElemetById('root')
    )
```

这个是一个类组件的，接受外界传来的一个Props (属性，property == properties) </br>
这里的执行顺序是

+ 1.调用`ReactDOM.render()` 方法并向其中传入 `<Welcome/ name= 'Jane'>` 元素
+ 2.然后React调用 `<Welcome/>` 组件，并传入{name ='Jane'} 作为props 对象
+ 3.`<Welcome/>`组件返回 `<h1>hello Jane</h1>`
+ 4.ReactDOM 更新DOM 使其显示为 hello Jane

>组件名称都是大写字母开始,
>`<div/>` 代表一个DOM 标签，而`<Welcome/>` 代表一个组件

## 合成组件

组件可以在他们的输出中引用其他组件

```js
    function Welcome (props) {
        const el = <h1>hello {props.name}</h1>
        return el
    }
    function App () {
        return (
            <div>
                <Welcome name='Jane'/>
                <Welcome name='Zhen'/>
                <Welcome name='Qi'/>
            </div>
        )
    }
    ReactDOM.render(
        <APP/>,
        document.getElementById('root')
    )
```