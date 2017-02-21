# 数据库设计

## 初始化数据库脚本

### 脚本目录
./demos/project/init/sql/ 

```sql
CREATE TABLE   IF NOT EXISTS  `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 用户ID
  `email` varchar(255) DEFAULT NULL,    # 邮箱地址
  `password` varchar(255) DEFAULT NULL, # 密码
  `name` varchar(255) DEFAULT NULL,     # 用户名
  `nick` varchar(255) DEFAULT NULL,     # 用户昵称
  `detail_info` longtext DEFAULT NULL,  # 详细信息
  `create_time` varchar(20) DEFAULT NULL,   # 创建时间
  `modified_time` varchar(20) DEFAULT NULL, # 修改时间
  `level` int(11) DEFAULT NULL, # 权限级别
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 插入默认信息
INSERT INTO `user_info` set name='admin001', email='admin001@example.com', password='123456';
```

