# 入门语法

## 笔记

PHP的代码是写在 ***<?php ?>*** 中的类似js 的script

+ 一个.php 的文件如果不是嵌套在HTML 里面的话是闭合的部分是可以省略不写的

```php
    <?php
        echo "hello PHP" ;
    ?>
    //
    <?php
        echo "想找个女朋友" ; // echo 语句和字符串之间需要空格
    // echo 是语句不是函数，输出字符串或变量值， var_dump 和print_r 是函数
    // print_r 可以打印复杂类型变量的值([], {}) 以列表的形式
```

+ php的代码是必须要写分号的， 英文状态下的 ```;``` ( js是不强制写 ```;```)

+ php 打印字符串是使用 ```echo```语句, (js 打印字符串是```console.log()```)

++ 字符串的链接符号是 ```.```，在js es5 中是需要用```+``` es6的模板字符串就不需要了```+```了

```php
    <?php
        echo "my lady" . "you are beautiful" ;
```