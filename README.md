## 浏览器版本过低

![example](https://github.com/dengtongyu/browser-demote/raw/master/res/example.png) 

##### 安装
```sh
npm install browser-demote
```

##### 使用

###### 基本用法
```js
var demote = require('browser-demote');
demote.show(); //显示
demote.hide(); //关闭
```

###### IE浏览器下弹出
```js
var demote = require('browser-demote');

//表示 IE <= 8 时弹出
demote.use({ie:8});
```

###### 判断是否支持某一css样式弹出
```js
var demote = require('browser-demote');

//表示 如果浏览器不支持 border-radius 样式，就会弹出
demote.use({refuse:'border-radius'}); 

//判断多个样式
demote.use({refuse:['box-sizing', 'border-radius']}); 
```

###### 获取弹出状态
```js
var demote = require('browser-demote');

//true 为弹出状态
demote.status().isShow
```