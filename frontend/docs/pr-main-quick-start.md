# 🚀 PR to Main - 快速入门指南

## 💡 简介

当你创建 Pull Request 到 `main` 分支时，系统会自动运行严格的代码质量检查。

## ✅ 检查前准备

在创建 PR 之前，请确保本地通过所有检查：

```bash
# 1. 基础检查
npm run lint                    # 代码规范检查
npm run check:components        # 组件使用检查
npm run check:deps             # 依赖检查
npm run analyze:i18n           # 多语言检查
npm run build                  # 构建测试

# 2. 自动修复（如果有问题）
npm run fix:lint               # 自动修复代码规范问题
npm run translate:missing:execute      # 添加缺失的翻译
npm run translate:inconsistent:execute # 修复翻译不一致

# 3. 安全检查
npm audit                      # 安全审计
npm audit fix                  # 修复安全问题（如有）
```

## 🛡️ 自动检查项目

PR 到 main 分支会自动检查：

- ✅ **TypeScript 严格验证** - 零类型错误
- ✅ **ESLint 零容忍** - 零警告零错误
- ✅ **组件使用检查** - 确保无死代码
- ✅ **依赖验证** - 确保依赖被正确使用
- ✅ **i18n 完整性** - 确保翻译完整
- ✅ **安全审计** - 检测安全漏洞
- ✅ **生产构建** - 确保能成功构建

## ❌ 如果检查失败

1. **查看错误详情** - 点击失败的检查查看具体错误
2. **本地修复问题** - 根据错误信息修复代码
3. **重新推送** - `git push` 会自动重新触发检查
4. **等待通过** - 所有检查通过后即可合并

## 🔑 管理员绕过

如果遇到紧急情况，管理员可以：

1. **强制合并** - 使用 GitHub 的 "Merge without waiting for requirements" 选项
2. **添加标签** - 给 PR 添加 `skip-validation` 标签跳过检查

## 🔧 常见问题快速修复

### TypeScript 错误
```bash
npx tsc --noEmit --strict  # 查看具体错误
# 修复类型注解、any 类型使用等
```

### ESLint 问题
```bash
npm run fix:lint           # 自动修复大部分问题
npm run lint               # 查看剩余问题
```

### i18n 问题
```bash
npm run translate:missing:execute      # 添加缺失翻译
npm run translate:inconsistent:execute # 修复不一致
```

### 依赖问题
```bash
npm run check:deps         # 查看未使用的依赖
npm uninstall <包名>       # 移除未使用的依赖
```

## 💡 最佳实践

- 🔍 **提交前本地测试** - 确保本地通过所有检查
- 📦 **小批量提交** - 避免大型 PR 难以调试
- 🚀 **及时修复** - 不要累积技术债务
- 📚 **更新文档** - 重要修改要更新相关文档

---

**💡 提示:** 这个严格的检查系统确保 main 分支始终保持高质量，为生产环境部署提供保障。
