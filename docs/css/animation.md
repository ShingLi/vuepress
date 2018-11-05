# animation 动画

## 从底部弹出的动画

```css
    .fixed-bottom{
        opcation: 0,
        transform: translate3d(0,100%,0);
        animation: fixedBottomAni .3s ease-in-out .6s;
        animation-fill-mode: forwards;
    }
    @keyframes fixedBottomAni {
        0% {
            transform: translate3d(0,100%,0);
            opacity: 0;
        }
        100% {
            transform: translateZ(0);
            opacity: 1;
        }
    }
````

```html
    <div class='fixed-bottom'></div>
````