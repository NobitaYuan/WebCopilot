<h1 align="center">
  <a href="https://github.com/NobitaYuan/WebCopilot" target="_blank">WebCopilot</a>
</h1>

## 📄 WebCopilot是什么?

WebCopilot 是一个基于 Vue3 + TS + Vite + Manifest V3 的开源浏览器插件

-   划词AI辅助（翻译、解释、搜索...）
-   即刻搜索
-   宗旨是提高您的浏览器体验

## 📦 安装依赖

```bash
pnpm install
```

## 🚀🔨 开发和构建

```bash
pnpm build
```

1. 在浏览器地址中输入：edge://extensions/ 或 chrome://extensions/
2. 打开开发人员模式
3. 点击加载解压缩的扩展导入构建后的build文件即可

## 📝 功能规划

-   [x] 基础的工程化配置
-   [x] 划词气泡显示
-   [ ] Dialog功能规划
-   [ ] 快捷搜索（baidu、google、bing）
-   [ ] 接入翻译API
-   [ ] 接入AI
-   [ ] 用户自定义提示词配置
-   [ ] ...

## 🏗️ 项目架构

### 技术栈

-   **框架**: Vue 3 (Composition API)
-   **语言**: TypeScript
-   **构建工具**: Vite (使用 rolldown-vite 作为打包引擎)
-   **规范**: Manifest V3 (最新 Chrome 扩展标准)
-   **UI 组件库**: Element Plus
-   **状态管理**: Pinia
-   **路由**: Vue Router
-   **样式**: SCSS + TailwindCSS
-   **国际化**: Vue I18n
-   **代码规范**: ESLint + Prettier + Husky + Commitizen

### 核心设计

#### 1. 多入口构建策略

项目采用**多配置分离构建**的设计理念，将 Chrome 扩展的不同部分分别打包：

```
构建流程：
├── vite.popup.config.ts      → 构建 Popup 弹窗页面
├── vite.content.config.ts    → 构建 Content Script 内容脚本
├── vite.background.config.ts → 构建 Background Service Worker
└── build.js                  → 合并构建产物到 build/ 目录
```

**构建产物目录**：

-   `build/` - 最终的扩展包目录
-   `_build_content/` - Content Script 临时构建目录（自动清理）
-   `_build_background/` - Background Script 临时构建目录（自动清理）

#### 2. 目录结构

```
WebCopilot/
├── public/                    # 静态资源
│   ├── manifest.json         # 扩展清单文件
│   └── images/               # 图标资源
├── src/
│   ├── popup/                # 弹窗页面（用户点击扩展图标时显示）
│   │   ├── main.ts          # Popup 入口文件
│   │   ├── popup.vue        # Popup 根组件
│   │   ├── router/          # 路由配置
│   │   ├── stores/          # Pinia 状态管理
│   │   ├── views/           # 页面组件
│   │   └── components/      # Popup 专用组件
│   ├── content/             # 内容脚本（注入到网页中运行）
│   │   ├── index.ts         # Content 入口文件
│   │   ├── content.vue      # Content 根组件
│   │   ├── dialog/          # 划词弹窗组件
│   │   ├── store/           # Content 状态管理（划词逻辑）
│   │   ├── hooks/           # 自定义 Hooks
│   │   └── utils/           # 工具函数（样式注入、位置计算等）
│   ├── background/          # 后台脚本（Service Worker）
│   │   ├── index.ts         # Background 入口
│   │   └── chrome.ts        # Chrome API 封装
│   ├── components/          # 全局共享组件
│   │   └── svgIcon.vue      # SVG 图标组件
│   ├── i18n/                # 国际化配置
│   │   ├── index.ts
│   │   └── locales/         # 语言文件（zh-cn、en）
│   ├── types/               # TypeScript 类型声明
│   │   ├── auto-imports.d.ts
│   │   ├── components.d.ts
│   │   └── vite-env.d.ts
│   └── api/                 # API 接口
├── build.js                 # 构建后处理脚本（合并文件、清理临时目录）
├── globalConfig.js          # 全局构建配置
├── vite.popup.config.ts     # Popup 构建配置
├── vite.content.config.ts   # Content Script 构建配置
└── vite.background.config.ts # Background 构建配置
```

#### 3. 关键技术实现

##### Shadow DOM 样式隔离

Content Script 使用 **Shadow DOM** 技术实现样式隔离，避免插件样式与网页样式冲突：

```typescript
// 创建隔离容器
const crxApp = document.createElement('div')
crxApp.id = 'webcopilot_crx_container'
document.documentElement.append(crxApp)

// 创建 Shadow DOM
const shadowEl = crxApp.attachShadow({ mode: 'open' })

// 将 CSS 注入到 Shadow DOM
insertStylesheet(shadowEl)
```

##### 路径别名配置

为了更好的代码组织，项目配置了多个路径别名：

```typescript
{
  '@/*': ['src/*'],              // 通用别名
  '@content/*': ['src/content/*'],   // Content Script 专用
  '@popup/*': ['src/popup/*'],       // Popup 专用
  '@background/*': ['src/background/*'] // Background 专用
}
```

##### 自动导入配置

使用 `unplugin-auto-import` 和 `unplugin-vue-components` 实现：

-   Vue API 自动导入（ref、computed 等）
-   Element Plus 组件按需自动导入
-   无需手动 import 即可使用

#### 4. 数据通信

Chrome 扩展各部分之间的通信方式：

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Popup     │ ◄────►  │   Background │ ◄────►  │  Content    │
│  (弹窗页面)  │         │  (Service    │         │ (内容脚本)   │
└─────────────┘         │    Worker)   │         └─────────────┘
                        └──────────────┘
                              ▲
                              │
                              ▼
                        ┌──────────────┐
                        │   Storage    │
                        │  (chrome.    │
                        │   storage)   │
                        └──────────────┘
```

-   **Content → Background**: `chrome.runtime.sendMessage`
-   **Popup → Background**: `chrome.runtime.getBackgroundPage`
-   **共享存储**: `chrome.storage.local` / `chrome.storage.session`

#### 5. 划词功能实现流程

```
用户选中文本
    ↓
content/store 检测 selectionchange 事件
    ↓
计算选区位置（fixPosition.ts）
    ↓
显示气泡（content.vue）
    ↓
用户点击气泡
    ↓
打开 Dialog 弹窗（dialog.vue）
    ↓
执行对应功能（翻译/搜索/AI）
```

### 开发建议

1. **修改 Popup 界面**：编辑 [src/popup/](src/popup/) 下的文件
2. **修改划词功能**：编辑 [src/content/](src/content/) 下的文件
3. **添加后台逻辑**：编辑 [src/background/](src/background/) 下的文件
4. **添加公共组件**：在 [src/components/](src/components/) 中创建
5. **修改权限配置**：编辑 [public/manifest.json](public/manifest.json)

### 构建流程详解

执行 `pnpm build` 时的完整流程：

1. **第一步**：构建 Popup 页面

    - 入口：`src/popup/main.ts`
    - 输出：`build/index.html` + 相关资源

2. **第二步**：构建 Content Script

    - 入口：`src/content/index.ts`
    - 输出：`_build_content/content.js` + `content.css`
    - 格式：CommonJS (cjs)

3. **第三步**：构建 Background Script

    - 入口：`src/background/index.ts`
    - 输出：`_build_background/background.js`
    - 格式：CommonJS (cjs)

4. **第四步**：合并和清理（build.js）
    - 将 Content 和 Background 的输出复制到 `build/` 目录
    - 删除临时构建目录（`_build_content`、`_build_background`）
    - 最终生成可直接加载的扩展包

# 📄 License

<a href="https://opensource.org/license/mit/" target="_blank">MIT license.</a>

> Copyright (c) 2026 NobitaYuan
