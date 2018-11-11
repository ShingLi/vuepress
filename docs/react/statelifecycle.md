# State&Lifecycle(生命周期)

```js
    function tick () {
        return (
            <div>
                <h1>hello Jane</h1>
                <p>现在的时间 {new Date().toLocaleTimeString()}</p>
            </div>
        )
    }
    ReactDOM.render(
        <tick/>,
        document.getElementById('root')
    )
    setInterval(() => tick(), 1000)
```