# 🚀 GitHub Actions Workflows

本项目使用了三个 GitHub Actions 工作流来确保代码质量和自动化部署。

## 📋 工作流程概览

### 1. 🚀 CI/CD Pipeline (`ci.yml`)
**触发条件**: 推送到 `main` 或 `dev` 分支，以及 PR 请求

**包含的检查**:
- 🏥 **项目健康检查**: 
  - 未使用组件检查
  - i18n 翻译验证  
  - 依赖使用分析
- 🔷 **TypeScript 类型检查**: 确保类型安全
- 🧹 **ESLint 检查**: 代码规范验证
- 🏗️ **构建测试**: 验证项目可以成功构建
- 🚀 **自动部署**: 仅在 `main` 分支推送时部署到 GitHub Pages

### 2. 🔍 Code Quality Check (`code-quality.yml`)
**触发条件**: PR 请求、每周一早上 8 点、手动触发

**深度分析包括**:
- 📊 **综合代码分析**: 完整的项目健康检查和自动修复
- 🔒 **安全审计**: npm 安全审计和依赖检查
- 🌍 **i18n 验证**: 
  - 专业 i18n 分析
  - 缺失翻译检测
  - 翻译不一致检查
- ⚡ **性能分析**: Bundle 大小分析
- 📢 **结果汇总**: 所有检查结果的详细报告

### 3. ⚡ Quick Check (`quick-check.yml`)
**触发条件**: 推送到开发分支 (`dev`, `feature/*`, `fix/*`, `chore/*`)

**快速验证**:
- 🔷 TypeScript 编译检查
- 🧹 基础 ESLint 检查（最多 10 个警告）
- 🔍 核心健康检查（组件和依赖）
- 🌍 i18n 快速检查（非阻塞）
- 🏗️ 构建验证

## 🔧 自定义脚本集成

所有工作流都使用项目中的自定义脚本：

```bash
# 项目健康检查
npm run check:health         # 完整健康检查
npm run check:components     # 组件使用检查
npm run check:deps          # 依赖使用分析

# i18n 管理
npm run analyze:i18n         # 专业 i18n 分析
npm run translate:missing    # 检查缺失翻译
npm run translate:inconsistent # 检查翻译不一致

# 代码质量
npm run fix:lint            # 自动修复 lint 问题
npm run lint                # ESLint 检查
```

## 📊 检查详情

### 项目健康检查包括:
- ✅ **组件使用情况**: 检测未使用的 TSX 组件
- ✅ **依赖分析**: 验证所有 npm 包都被使用
- ✅ **i18n 完整性**: 确保翻译键的正确使用

### i18n 专业分析:
- 🔍 **静态分析**: 检测代码中使用的翻译键
- 🔄 **动态键检测**: 智能识别模板字面量构造的键
- 🌐 **多语言一致性**: 确保所有语言文件同步
- 📊 **详细报告**: 已使用、缺失、不一致的键

### 安全和性能:
- 🔒 **npm 安全审计**: 检查已知漏洞
- 📦 **依赖更新检查**: 识别过时的包
- ⚡ **Bundle 分析**: 监控构建产物大小

## 🎯 状态徽章

在项目 README 中添加这些徽章来显示工作流状态：

```markdown
![CI/CD](https://github.com/Azusain/Dulcets/workflows/🚀%20CI/CD%20Pipeline/badge.svg)
![Code Quality](https://github.com/Azusain/Dulcets/workflows/🔍%20Code%20Quality%20Check/badge.svg)
![Quick Check](https://github.com/Azusain/Dulcets/workflows/⚡%20Quick%20Check/badge.svg)
```

## ⚙️ 配置说明

### 依赖缓存
所有工作流都使用 npm 缓存来加速安装：
```yaml
cache: 'npm'
cache-dependency-path: 'frontend/package-lock.json'
```

### 环境要求
- **Node.js**: 20.x
- **操作系统**: Ubuntu Latest
- **包管理器**: npm (使用 `npm ci` 确保依赖一致性)

### 权限设置
部署工作流需要以下权限：
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## 🔄 开发工作流建议

1. **功能开发**: 在 `feature/*` 分支开发，触发快速检查
2. **代码审查**: 创建 PR 到 `dev`，触发完整的代码质量检查
3. **集成测试**: 合并到 `dev`，运行 CI/CD 管道
4. **生产部署**: 合并到 `main`，自动构建并部署到 GitHub Pages

## 📈 监控和维护

- **每周检查**: 代码质量工作流每周一自动运行
- **手动触发**: 所有工作流都支持手动触发
- **详细报告**: 检查 GitHub Actions 页面查看详细的执行日志和汇总报告

这些工作流确保了代码质量、项目健康和自动化部署的完整流程！🎉
