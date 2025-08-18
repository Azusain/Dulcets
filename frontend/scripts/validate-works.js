#!/usr/bin/env node

/**
 * Works JSON Configuration Validator
 * 验证 works.json 文件的格式和内容完整性
 */

const fs = require('fs');
const path = require('path');

const WORKS_JSON_PATH = path.join(__dirname, '../public/service/works.json');

function validateWorksJson() {
  console.log('🔍 验证 works.json 配置文件...\n');

  try {
    // 读取JSON文件
    const jsonContent = fs.readFileSync(WORKS_JSON_PATH, 'utf8');
    const works = JSON.parse(jsonContent);

    if (!Array.isArray(works)) {
      throw new Error('works.json 必须是一个数组');
    }

    console.log(`📊 总视频数量: ${works.length}`);
    console.log(`📐 预期布局: ${Math.ceil(works.length / 3)} 行 x 3 列\n`);

    // 验证每个视频条目
    works.forEach((work, index) => {
      console.log(`🎥 验证视频 ${index + 1}: ${work.titleJp || work.title || 'Untitled'}`);
      
      const requiredFields = [
        'title', 'titleEn', 'titleJp',
        'excerpt', 'excerptEn', 'excerptJp',
        'date', 'duration', 'image', 'videoUrl'
      ];

      const missingFields = requiredFields.filter(field => !work[field]);
      
      if (missingFields.length > 0) {
        console.log(`   ❌ 缺少字段: ${missingFields.join(', ')}`);
      } else {
        console.log(`   ✅ 所有必需字段都存在`);
      }

      // 验证URL格式
      if (work.videoUrl && !work.videoUrl.includes('youtube.com/watch?v=')) {
        console.log(`   ⚠️  视频URL格式可能不正确: ${work.videoUrl}`);
      }

      if (work.image && !work.image.startsWith('https://i.ytimg.com/vi/')) {
        console.log(`   ⚠️  缩略图URL格式可能不正确: ${work.image}`);
      }

      console.log(`   📅 发布时间: ${work.date}`);
      console.log(`   ⏱️  视频时长: ${work.duration}`);
      console.log('');
    });

    console.log('✅ works.json 验证完成！');
    console.log(`\n📋 布局预览:`);
    console.log(`   第1行: ${works.slice(0, 3).length} 个视频`);
    if (works.length > 3) {
      console.log(`   第2行: ${works.slice(3, 6).length} 个视频`);
    }
    if (works.length > 6) {
      console.log(`   第3行: ${works.slice(6, 9).length} 个视频`);
    }
    if (works.length > 9) {
      console.log(`   ...还有 ${Math.ceil((works.length - 9) / 3)} 行`);
    }

  } catch (error) {
    console.error('❌ 验证失败:', error.message);
    process.exit(1);
  }
}

// 运行验证
validateWorksJson();
