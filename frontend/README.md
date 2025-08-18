# 🎵 Dulcets Frontend

[![CI/CD Pipeline](https://github.com/your-username/dulcets/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/dulcets/actions/workflows/ci.yml)
[![Code Quality](https://github.com/your-username/dulcets/actions/workflows/code-quality.yml/badge.svg)](https://github.com/your-username/dulcets/actions/workflows/code-quality.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

现代化的多语言音乐应用前端，基于 Next.js 和 TypeScript 构建，集成专业级 i18n 管理系统和企业级 CI/CD 流水线。

## ✨ 特性

- 🎯 **现代技术栈** - Next.js 14, TypeScript, Tailwind CSS
- 🌍 **专业 i18n 系统** - 支持日语、英语、中文，动态键检测
- 🛡️ **严格质量控制** - PR 到 main 分支的零容忍检查
- 🔧 **自动化工具** - 组件检查、依赖分析、翻译管理
- 🚀 **企业级 CI/CD** - GitHub Actions 自动化部署
- 📱 **响应式设计** - 支持所有设备尺寸
- 🎨 **现代 UI** - 基于 Tailwind CSS 的精美界面

## 🚀 快速开始

### 环境要求

- Node.js 20+
- npm 或 yarn

### 安装和运行

```bash
# 克隆仓库
git clone https://github.com/your-username/dulcets.git
cd dulcets/frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 开发命令

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器

# 代码质量
npm run lint         # ESLint 检查
npm run fix:lint     # 自动修复 lint 问题
npm run type-check   # TypeScript 类型检查

# 项目健康检查
npm run check:health      # 完整项目健康检查
npm run check:components  # 检查未使用的组件
npm run check:deps       # 检查依赖使用情况

# i18n 管理
npm run analyze:i18n                    # 分析多语言状态
npm run translate:missing:execute       # 添加缺失的翻译
npm run translate:inconsistent:execute  # 修复翻译不一致
```

## 🛡️ PR 到 Main 分支 - 严格检查

当创建 Pull Request 到 `main` 分支时，会自动触发严格的代码质量验证：

### 自动检查项目
- ✅ TypeScript 严格验证（零错误）
- ✅ ESLint 零容忍检查（零警告）
- ✅ 组件使用检查（无死代码）
- ✅ 依赖验证（确保正确使用）
- ✅ i18n 完整性检查（翻译完整）
- ✅ 安全审计（无漏洞）
- ✅ 生产构建测试（确保可构建）

### 检查前准备
```bash
# 在创建 PR 前运行这些命令确保通过检查
npm run lint
npm run check:components
npm run check:deps
npm run analyze:i18n
npm run build

# 自动修复问题
npm run fix:lint
npm run translate:missing:execute
npm run translate:inconsistent:execute
```

📖 **详细指南:** 
- [PR 验证系统详细文档](./docs/pr-main-validation.md)
- [快速入门指南](./docs/pr-main-quick-start.md)

### 管理员绕过选项
- 使用 GitHub 的 "Merge without waiting for requirements" 选项
- 给 PR 添加 `skip-validation` 标签

## 🌍 多语言支持 (i18n)

本项目集成了专业的自研 i18n 管理系统：

### 支持的语言
- 🇯🇵 **日语** (ja) - 默认语言
- 🇺🇸 **英语** (en)
- 🇨🇳 **中文** (zh)

### 特性
- 🔍 **智能键检测** - 支持动态模板字符串
- 🔄 **自动翻译** - 基于 Google Translate API
- 📊 **完整性分析** - 检测缺失和不一致的翻译
- 🛠️ **自动修复** - 一键添加缺失翻译和修复不一致

### 使用方法
```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.message', { name: 'User' })}</p>
    </div>
  );
}
```

📖 **详细文档:** [i18n 使用指南](./docs/i18n-guide.md)

## 🏗️ 项目结构

```
frontend/
├── app/                 # Next.js App Router
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 首页
├── components/          # React 组件
│   ├── ui/             # 基础 UI 组件
│   └── layout/         # 布局组件
├── lib/                # 工具库
│   ├── i18n/           # i18n 配置
│   └── utils/          # 工具函数
├── locales/            # 翻译文件
│   ├── ja.json         # 日语翻译
│   ├── en.json         # 英语翻译
│   └── zh.json         # 中文翻译
├── scripts/            # 自动化脚本
├── docs/               # 项目文档
└── .github/            # GitHub Actions 工作流
```

## 🔧 技术栈

### 核心技术
- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 原子化 CSS 框架
- **React i18next** - React 国际化库

### 开发工具
- **ESLint** - 代码规范检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks 管理
- **GitHub Actions** - CI/CD 自动化

### 自研工具
- **i18n 分析器** - 多语言键检测和管理
- **组件检查器** - 未使用组件检测
- **依赖分析器** - 依赖使用情况分析

## 🤝 贡献指南

### 开发流程
1. Fork 项目并克隆到本地
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

### 分支策略
- `main` - 生产分支，受严格保护
- `dev` - 开发分支，日常开发
- `feature/*` - 功能分支
- `fix/*` - 修复分支

### 代码规范
- 使用 TypeScript 进行类型定义
- 遵循 ESLint 配置的代码规范
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 提交信息遵循 Conventional Commits

## 📚 文档

- [i18n 使用指南](./docs/i18n-guide.md)
- [组件开发指南](./docs/component-guide.md)
- [PR 验证系统](./docs/pr-main-validation.md)
- [快速入门指南](./docs/pr-main-quick-start.md)
- [GitHub Actions 说明](./docs/github-actions-guide.md)

## 🚀 部署

### GitHub Pages（自动）
推送到 `main` 分支会自动触发部署到 GitHub Pages。

### 手动部署
```bash
npm run build    # 构建生产版本
npm run export   # 导出静态文件
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🎯 路线图

- [ ] 音频播放功能
- [ ] 播放列表管理
- [ ] 用户系统
- [ ] 歌词显示
- [ ] 音频可视化
- [ ] PWA 支持
- [ ] 暗色主题
- [ ] 移动端优化

---

**💡 提示:** 这是一个现代化的 Next.js 项目，集成了企业级的代码质量管理和自动化流程。
