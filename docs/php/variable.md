# 变量

------

### 声明变量

php中声明变量是使用 ```$```而js中声明变量 可以使用 ```var```| ```let```|```const```或者直接写变量名

```php
    <?php
        $name = '珍'
```

### php-变量声明的规则

+ 变量名必须是字母或下划线开头 '_'

+ 变量名以```$```开始，后面跟着变量的名称

+ 变量名是区分大小写的(JS也是区分大小写的)

+ 变量名不能包含空格

### 作用域

PHP有四种不同的作用域

-> local
-> global
-> static
-> paramerter

------

### 局部和全局作用域

在所有函数外定义的变量，拥有全局作用域。除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局
变量需要使用```global```关键字

```php
    <?php
        $gender = 'lady' ;

        function sayName () {
            $name = 'zhen' ;
            echo $name . PHP_EOL; // 'zhen'
            echo $gender ; // 报错
            global $gender ;
            echo $gender . PHP_EOL ;
        } ;
        sayName () ;
    ?>
```

#### 全局变量

PHP将所有的全局变量储存在一个名为 $GLOBALS[index] 的数组中。这个数组可以在函数内部访问到，也可以直接用来更新全局变量

```php
    <?php
        // 上面的代码可以这样
        function sayName () {
            echo $GLOBALS['gender'] ;
        }
    ?>
```