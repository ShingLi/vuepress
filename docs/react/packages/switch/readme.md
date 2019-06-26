# Switch组件(React)

## 引用

```js
    import Switch from 'path/switch/switch'
```

## 基本使用

```js
    class Demo extends Component {
        state = {
            checked: false
        }
        onChange (checked) {
            console.log(`switch is ${checked}`)
        }

        render () {
            return (
                <Switch onChange = { this.onChange.bind(this) } checked = { this.state.checked }/>
            )
        }
    }
```