## 需要安装nodejs ，版本为版本20.10.0


## 还需要安装yarn安装方法自行百度


# k8s-ex

## 项目初始化

```sh
yarn
```

### 运行项目

```sh
yarn dev
```


      目录结构如下
├── README.md

├── package.json

├── index.html

├── src

│   ├── api  # 请求接口

│   ├── assets  # 静态资源


│   ├── components  # 通用业务组件

│   ├── config  # 全局配置(包含echarts主题)

│   ├── layout  # 布局

│   ├── views  # 页面模板

│   ├── router # 路由配置

│   ├── store  # 状态管理中心

│   └── services  # 工具库

│   └── App.vue  # 视图入口

│   └── main.ts  # 入口文件

└── tsconfig.json

使用 JavaScript 语法，支持TypeScript语法

启用 JSX 支持

引入 Vue Router 进行单页面应用开发

引入 Pinia 用于状态管理

使用 element-plus UI

使用 axios

node 版本为 v20.9.0
npm 版本为 v10.1.0
