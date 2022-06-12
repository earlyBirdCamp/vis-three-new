# vis-three

three.js 库二次功能封装 + 配置化的 three.js 开发。

<p>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/Version-0.1.3-{}" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/License-MPL2.0-{}" alt="License"></a>
</p>

## 主页及文档在线地址

[https://shiotsukikaedesari.gitee.io/vis-three](https://shiotsukikaedesari.gitee.io/vis-three)

## 安装

```
npm i vis-three
```

## 导入

```js
// 整体导入
import * as Vis from "vis-three";

// 按需导入
import {
  ModelingEngineSupport,
  SupportDataGenerator,
  generateConfig,
} from "vis-three";
```

## 查看 demo 示例

1. 下载或者克隆 main 分支代码
2. 执行`npm i` 安装依赖
3. 执行`npm run examples`
4. 打开浏览器访问: [http://localhost:3000/examples/index.html](http://localhost:3000/examples/index.html)

5. demo 源码位于：`examples`文件夹下

## 备注

gitee 仓库为 github 的同步备份仓库
github 地址：[https://github.com/Shiotsukikaedesari/vis-three](https://github.com/Shiotsukikaedesari/vis-three)

## 项目命令

### 库

- 开发：`npm run dev`
- 构建： `npm run build`
- 代码格式化： `npm run lint`

### 测试

- 查看例子： `npm run examples`
- e2e 测试： `npm run e2e:open`

### 文档

- 文档开发： `npm run docs:dev`
- 文档构建： `npm run docs:build`
- 文档服务： `npm run docs:serve`

### 主页

- 主页开发： `npm run website:dev`
- 主页构建： `npm run website:build`
- 主页代码格式化： `npm run website:lint`

## 项目案例

github:

- [https://github.com/Shiotsukikaedesari/three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://github.com/Shiotsukikaedesari/vis-model-generator](https://github.com/Shiotsukikaedesari/vis-model-generator)

gitee:

- [https://gitee.com/Shiotsukikaedesari/three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://gitee.com/Shiotsukikaedesari/vis-model-generator](https://gitee.com/Shiotsukikaedesari/vis-model-generator)
