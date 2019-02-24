# 记一次问题，移动端如何解决300ms 延迟的问题？

如果别人问起我来，怎么解决移动端click 300ms的问题，我一般都会说如下2个解决方法

+ meta 标签中设置 <meta name='viewport'content="width = device-width,user-scalable = no"/>
+ fastclick (第三方组件库，会导致vue的包变大不好)

但是别人要是问起我你能自己封装个吗，一般这样我就卡死了,所以为了避免这个情况就尝试下写一个 代码地址