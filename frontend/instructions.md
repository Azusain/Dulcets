# Video Configuration Update Guide

## ✅ 已完成的更新

### 1. 添加了新视频到 works.json
- **新视频**: 【オリジナル曲】アリガト。 / Rucha x Dulcets
- **视频ID**: 6av5Lbuzqnc
- **位置**: 添加到列表首位（最新视频）
- **多语言支持**: 包含中文、英文、日文标题和描述

### 2. 当前视频总数: 7个
现在系统将显示 7 个视频，布局为：
- 第1行：3个视频
- 第2行：3个视频  
- 第3行：1个视频

### 3. 布局系统
当前使用的CSS Grid布局自动处理：
```css
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```
- 小屏幕 (mobile): 1列
- 中等屏幕 (tablet): 2列  
- 大屏幕 (desktop): 3列

## 🚀 如何添加更多视频

只需编辑 `public/service/works.json` 文件，按以下格式添加新条目：

```json
{
  "title": "中文标题",
  "titleEn": "English Title", 
  "titleJp": "日本語タイトル",
  "excerpt": "中文描述...",
  "excerptEn": "English description...",
  "excerptJp": "日本語の説明...",
  "date": "发布时间",
  "duration": "视频时长",
  "image": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg",
  "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

## 📋 视频信息获取方式

从 YouTube 视频页面获取所需信息：
1. **视频ID**: URL中 `?v=` 后面的部分
2. **缩略图**: `https://i.ytimg.com/vi/{VIDEO_ID}/hqdefault.jpg`
3. **视频链接**: `https://www.youtube.com/watch?v={VIDEO_ID}`

## 🎨 系统特性

✅ **响应式布局** - 自动适应不同屏幕尺寸
✅ **多语言支持** - 根据用户语言显示对应内容
✅ **无限扩展** - 可添加任意数量视频
✅ **配置驱动** - 仅需编辑JSON即可更新内容
✅ **SEO友好** - 自动处理缩略图和链接

## 🛠️ 便捷管理工具

### 方式1: 使用交互式工具添加新视频
```bash
npm run add-video
```
按提示输入视频信息，工具会自动：
- 提取视频ID
- 生成缩略图URL
- 格式化视频链接
- 更新works.json文件

### 方式2: 验证配置文件
```bash
npm run validate-works
```
检查works.json的格式和完整性，显示布局预览。

### 方式3: 手动编辑JSON文件
直接编辑 `public/service/works.json`，参考现有格式添加新视频。

## 🚀 快速开始

1. **启动开发服务器**:
   ```bash
   npm run dev
   ```

2. **添加新视频**:
   ```bash
   npm run add-video
   ```

3. **验证配置**:
   ```bash
   npm run validate-works
   ```

现在您可以通过多种方式管理视频内容，完全无需修改代码！
