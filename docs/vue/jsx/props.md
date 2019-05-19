# Jsx-props

>Vue 和 React对比

## Vue

+ 使用

```js
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
            return (
                <div>
                    <div>{this.vue}</div>
                    <div domPropsInnerHTML = {this.html}></div>
                </div>
            )
        }
    }
```

## React

+ 使用
    + 类型 (function)
        ```js
            const Demo = (props) => {
                <h1>hello {props.name}</h1>
            }
            const element = <Demo name ='cheng' />
        ```
    + 类型 (Class)
        ```js
            class Demo  extends Comeponet {
                render () {
                    <Fragments>
                        <div>hello {this.props.name}</div>
                    </Fragments>
                }
            }
        ```