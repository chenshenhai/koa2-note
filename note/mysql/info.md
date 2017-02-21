# mysql模块

## 快速开始

### 安装MySQL数据库
[https://www.mysql.com/downloads/](https://www.mysql.com/downloads/)

### 安装 node.js的mysql模块

```
npm install --save mysql
```

### 模块介绍
mysql模块是node操作MySQL的引擎，可以在node.js环境下对MySQL数据库进行建表，增、删、改、查等操作。

### 开始使用

#### 创建数据库会话
```js
const mysql      = require('mysql')
const connection = mysql.createConnection({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '123456'   // 数据库密码
  database : 'my_database'  // 选中数据库
})
 
// 执行sql脚本对数据库进行读写 
connection.query('SELECT * FROM my_table',  (error, results, fields) => {
  if (error) throw error
  // connected! 
  
  // 结束会话
  connection.release() 
});
```

> 注意：一个事件就有一个从开始到结束的过程，数据库会话操作执行完后，就需要关闭掉，以免占用连接资源。

#### 创建数据连接池
一般情况下操作数据库是很复杂的读写过程，不只是一个会话，如果直接用会话操作，就需要每次会话都要配置连接参数。所以这时候就需要连接池管理会话。

```js
const mysql = require('mysql')

// 创建数据池
const pool  = mysql.createPool({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '123456'   // 数据库密码
  database : 'my_database'  // 选中数据库
})
 
// 在数据池中进行会话操作
pool.getConnection(function(err, connection) {
   
  connection.query('SELECT * FROM my_table',  (error, results, fields) => {
    
    // 结束会话
    connection.release();
 
    // 如果有错误就抛出
    if (error) throw error;
  })
})
```

## 更多模块信息
更多详细API可以访问npm官方文档 [https://www.npmjs.com/package/mysql](https://www.npmjs.com/package/mysql)


