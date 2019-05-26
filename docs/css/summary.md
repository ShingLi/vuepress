# 总结

+ font-weight: 600 在一些安卓机器上不显示加粗
+ Word-break: break-word 纯数字和字母不换行
+ width: fill-available 可以使行内元素宽度为父元素的100%
+ width: min-content
+ width: max-content  类似 white-space: nowrap
+ width: fit-content 收缩与包裹可以使块级元素变成行内元素一样收缩 但是却保持原有块级的特性
+ box-sizing: content-box // 内容区的宽度不包含border 和padding
+ display:flex (父元素，子元素就算是行内元素也具有宽高)
  
+ (坑)
    + ```
            <div class='grandpa'>
                <div class='parent'>
                    <div class='child'></div>
                </div>
            </div>
            .grandpa{
                display: flex;
                flex-direction:column;
                height: 100vh;
                .parent{
                    flex:1;
                    .child{
                        position:relative;
                        height:100%;
                    }
                }
            }
            // 这样的写法在苹果上面有Bug的，Chrome上的child的高度是会继承他父元素的高度，
            // 苹果上child 高度是为0
                // 解决
                    .parent{
                        flex:1;
                        display: flex;
                        .child{
                            position: relative;
                            flex:1;
                        }
                    }
        ```

+ transform 是不能应用到行内元素的, 如 `a { transform: rotate(360deg)}` 这是无效的