
# Switch

## 使用

```js
    import Switch from 'path/switch'
    Vue.use(Switch)
```

## 代码演示

### 基础用法

```js
    <lc-switch v-model = "value" />
    <lc-switch v-model = "value" disabled />
    <lc-switch v-model = "value" >开关{{ value }}</lc-switch>

    export default {
        data () {
            value: true
        }
    }
```

## API
