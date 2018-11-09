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
    React.redner(
        <Welcome name= 'Jane'/>,
        docuemnt.getElemetById('root')
    )
```