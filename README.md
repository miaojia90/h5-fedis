## 概述

fedis 是一个基于 gulp/gulp-plugins 的前端开发集成解决方案。
让你从繁杂无聊的复制、粘贴、压缩、重命名等事务中解脱出来，从而更专注于具体业务的开发实现。

## 特性

集成了常用任务，后期会增加更多功能：

功能  |  描述
---- | ---- 
tmaker		| 模板中间语言解释引擎
doc         | 文档生成
switch      | 项目管理
publish		| 发布项目 
test  		| 测试
SSI         | Server Side Include

## 如何使用
* 进入 fedis/ 目录
* 新建项目 `gulp --switch project-name`
* 执行 gulp 命令启动 fedis
* 进入 fedis/app/ 开始工作

#### 提醒
* 模板文件 (html) 中引用的预览附件请存放在 `./app/data/` 中
* CSS 中引用的附件请存放在 `./app/scss/` 目录下即可

#### 显示/存档/新建/切换 项目
* `$gulp --show` 显示全部已存档和当前工作项目。
* `$gulp --archive` 存档当前工作项目。
* `$gulp --switch project-name` 切换至 `project-name` 项目，如果 `project-name` 项目不存在则会新建。

#### 修改默认项目模板
每次切换到一个新的不存在的项目时都会创建一个新的项目，新项目内容在 archive/_init 目录中，修改这些文件即可
