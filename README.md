[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D16-brightgreen.svg?logo=node.js)](https://nodejs.org/)
[![Yarn Version](https://img.shields.io/badge/Yarn-%3E%3D1.22-blue.svg?logo=yarn)](https://yarnpkg.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.3-brightgreen.svg?logo=vue.js)](https://vuejs.org/)
[![Vite Version](https://img.shields.io/badge/Vite-^4.4.11-blueviolet.svg?logo=vite)](https://vitejs.dev/)
[![GPLv3 License](https://img.shields.io/badge/License-GPLv3-yellow.svg)](https://www.gnu.org/licenses/gpl-3.0)

## 学生在线实验平台（前端部分）

这是一个使用 Vue.js、Go 和 Kubernetes（K8S）构建的学生在线实验平台，旨在为计算机课程提供实验支持。

该平台具有以下特点和功能：

- **技术栈**：
  - **前端**：使用 Vue.js 构建交互界面，提供优秀的用户体验。
  - **后端**：采用 Go 语言编写，调用 Kubernetes (K8S) 的 API
  - **部署**：Nginx
- **平台功能**：
  - **用户管理**：
    - 管理员和教师都具有用户管理权限，包括创建、编辑和删除用户账号（教师不具备删除用户的权限）。
  - **班级管理**：
    - 创建班级：管理员和教师都可以创建新的班级。
    - 离开班级：学生、教师都可以离开班级。
    - 删除班级：管理员可以删除班级。
  - **实验功能（待做）**：
    - 发布实验：管理员和教师都可以发布新的实验任务，设置截止日期和其他要求。
    - 销毁实验：管理员和教师都有权删除不再需要的实验任务。
  - **课程功能（待做）**：
    - 创建课程：管理员和教师都可以创建新的课程。
  - **作业功能（待做）**：
    - 创建作业：管理员和教师都可以创建新的作业任务。
    - 提交作业：学生提交作业。
    - 批改作业：采用莱文斯顿距离模糊匹配。
  - **学生端（待做）**：
    - 完成实验：学生可以完成教师发布的实验任务。
    - 查看实验结果：学生可以查看自己的实验成绩和教师的反馈。
    - 提交实验：学生可以提交实验结果供教师评阅。

更多功能待开发......



## 项目初始化

```sh
yarn
```

## 运行项目

```sh
yarn dev
```
