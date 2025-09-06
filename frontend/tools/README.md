# YouTube videos auto-fetching system

这个系统会自动从 YouTube 频道获取视频信息并更新 `work.json` 文件。

## 设置步骤

### 1. 获取 YouTube API key

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建一个新项目或选择现有项目
3. 启用 YouTube Data API v3
4. 创建 API key（限制为 YouTube Data API v3）

### 2. 获取 YouTube 频道 ID

由于脚本中硬编码了频道 ID `UCfM3zsQsOnfWNUppiycmBuw`，你需要确认这是否是正确的 @Dulcets 频道 ID。

如果需要获取正确的频道 ID：
1. 访问频道页面 https://www.youtube.com/@Dulcets
2. 查看页面源码搜索 "channelId" 或使用浏览器开发者工具
3. 或者使用 YouTube API 通过频道名称查询

### 3. 设置 GitHub Secrets

在你的 GitHub 仓库中添加以下 secrets：

#### YOUTUBE_API_KEY
- 去 GitHub 仓库 → Settings → Secrets and variables → Actions
- 点击 "New repository secret"
- Name: `YOUTUBE_API_KEY`
- Value: 你从 Google Cloud Console 获取的 API key

#### PAT_TOKEN (绕过分支保护)
- 去 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- 点击 "Generate new token (classic)"
- 设置 expiration 和所需权限：
  - `repo` (完整访问权限)
  - `workflow` (如果需要修改 workflow 文件)
- 复制生成的 token
- 在仓库的 Secrets 中添加：
  - Name: `PAT_TOKEN`
  - Value: 你刚才生成的 personal access token

### 4. 手动测试

在设置完成后，你可以：

1. 手动运行 GitHub Action（去 Actions → fetch YouTube videos → Run workflow）
2. 或者在本地测试：
   ```bash
   cd frontend
   npm install
   export YOUTUBE_API_KEY="your_api_key_here"
   npm run fetch:youtube
   ```

### 5. 自动运行时间

GitHub Action 会在以下时间自动运行（日本时间）：
- 每天中午 12:00 (UTC 3:00)
- 每天午夜 12:00 (UTC 15:00)

## 文件说明

- `tools/types.ts` - TypeScript 类型定义
- `tools/fetch-youtube-videos.ts` - 主要的数据获取脚本
- `.github/workflows/fetch-youtube-videos.yml` - GitHub Actions 工作流
- `work.json` - 输出文件（将在项目根目录生成）

## work.json 结构

```json
{
  "videos": [
    {
      "title": "视频标题",
      "date": "2025-01-06",
      "viewCount": 12345,
      "url": "https://www.youtube.com/watch?v=VIDEO_ID",
      "thumbnail": "https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg"
    }
  ],
  "lastUpdated": "2025-01-06T09:30:00.000Z"
}
```

## 故障排除

如果遇到问题：

1. 检查 GitHub Actions 日志
2. 确认 API key 有效且有足够配额
3. 确认频道 ID 正确
4. 检查 PAT token 权限是否足够
