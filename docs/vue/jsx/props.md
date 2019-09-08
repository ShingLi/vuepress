<!--
 * @Description: Jsx
 * @Author: shingli
 * @Date: 2019-06-06 23:28:04
 * @LastEditTime: 2019-09-08 09:23:35
 * @LastEditors: Please set LastEditors
 -->
# Jsx-props

>Vue 和 React对比

## Vue

+ 使用

```jsx
    export default {
        props: {
            value: {
                type: [String,Number],
                requred: true
            },
            html: {
                type: String,
                default: ''
            }
        },
        render () {
            const { value, html } = this
            return (
                <div class= 'wrapper'>
                    <div>{ value }</div>
                    <div domPropsInnerHTML = { html } ></div>
                </div>
            )
        }
    }
```

## React

+ 使用
    + 类型 (function)
        ```jsx
            const Demo = (props) => {
                <h1>hello {props.name}</h1>
            }
            const element = <Demo name ='cheng' />
        ```
    + 类型 (Class)
        ```jsx
            class Demo  extends Comeponet {
                render () {
                    <Fragments>
                        <div className='wrapper'>hello { this.props.name }</div>
                    </Fragments>
                }
            }
        ```

## 区别

类名，vue中是`class` react中是`className`