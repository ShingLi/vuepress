
# JSX 简介

```jsx
    const element =  <h1>hello, React </h1>
```

上面的这个变量就是邪恶的jsx

***jsx中使用JavaScript表达式需要使用{}***

```jsx
    function formatName (user) {
        return `${user.firstName} ${user.lastName}`
    }
    const user = {
        firstName: 'li',
        lastName: 'cheng'
    }

    const element = (
        <h1>{formatName(user)}</h1>
    )
    React.render(
        element,
        document.getElementById('root')
    )
```
