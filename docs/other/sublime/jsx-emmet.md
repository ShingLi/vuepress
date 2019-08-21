<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 20:40:34
 * @LastEditTime: 2019-08-21 20:46:01
 * @LastEditors: Please set LastEditors
 -->
# jsx 中使用emmet扩张

```js
    //  首选项 --> 快捷键设置 --> 用户设置
    { "keys": ["tab"], "command": "expand_abbreviation_by_tab", "context":
        [
            { "operand": "source.js", "operator": "equal", "match_all": true, "key": "selector" },
            { "match_all": true, "key": "selection_empty" },
            { "operator": "equal", "operand": false, "match_all": true, "key": "has_next_field" },
            { "operand": false, "operator": "equal", "match_all": true, "key": "auto_complete_visible" },
            { "match_all": true, "key": "is_abbreviation" }
        ]
    }
```

[代码配置地址](https://stackoverflow.com/questions/26089802/in-sublime-text-3-how-do-you-enable-emmet-for-jsx-files)