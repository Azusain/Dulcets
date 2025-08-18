#!/usr/bin/env node

/**
 * Video Management Tool
 * 视频管理工具 - 快速添加新的YouTube视频到works.json
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const WORKS_JSON_PATH = path.join(__dirname, '../public/service/works.json');

function extractVideoId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function generateThumbnailUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function generateVideoUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function addVideo() {
  console.log('🎬 YouTube 视频添加工具\n');

  try {
    // 读取现有配置
    const jsonContent = fs.readFileSync(WORKS_JSON_PATH, 'utf8');
    const works = JSON.parse(jsonContent);

    // 收集视频信息
    const videoUrl = await askQuestion('📹 请输入YouTube视频URL: ');
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      throw new Error('无效的YouTube URL');
    }

    console.log(`✅ 视频ID: ${videoId}`);

    const titleJp = await askQuestion('🇯🇵 日文标题: ');
    const titleEn = await askQuestion('🇺🇸 英文标题: ');
    const titleZh = await askQuestion('🇨🇳 中文标题: ');

    const excerptJp = await askQuestion('🇯🇵 日文描述: ');
    const excerptEn = await askQuestion('🇺🇸 英文描述: ');
    const excerptZh = await askQuestion('🇨🇳 中文描述: ');

    const duration = await askQuestion('⏱️  视频时长 (例: 3:20): ');
    const date = await askQuestion('📅 发布时间 (例: 1天前): ');

    // 创建新视频条目
    const newVideo = {
      title: titleZh,
      titleEn: titleEn,
      titleJp: titleJp,
      excerpt: excerptZh,
      excerptEn: excerptEn,
      excerptJp: excerptJp,
      date: date,
      duration: duration,
      image: generateThumbnailUrl(videoId),
      videoUrl: generateVideoUrl(videoId)
    };

    // 询问插入位置
    const insertAtTop = await askQuestion('📍 是否插入到列表顶部？ (y/n): ');
    
    if (insertAtTop.toLowerCase() === 'y') {
      works.unshift(newVideo); // 添加到开头
    } else {
      works.push(newVideo); // 添加到末尾
    }

    // 保存更新后的配置
    fs.writeFileSync(WORKS_JSON_PATH, JSON.stringify(works, null, 2), 'utf8');

    console.log('\n✅ 视频添加成功！');
    console.log('📊 当前视频总数:', works.length);
    console.log('📐 布局:', Math.ceil(works.length / 3), '行 x 3 列');
    console.log('\n🎉 新视频信息:');
    console.log('   标题:', titleJp);
    console.log('   时长:', duration);
    console.log('   缩略图:', generateThumbnailUrl(videoId));

  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 运行工具
addVideo();
