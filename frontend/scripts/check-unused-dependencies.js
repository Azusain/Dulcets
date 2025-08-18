const fs = require('fs');
const path = require('path');

/**
 * 检查未使用的依赖包
 */

class DependencyChecker {
  constructor() {
    this.packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    this.dependencies = {
      ...this.packageJson.dependencies || {},
      ...this.packageJson.devDependencies || {}
    };
    this.usedPackages = new Set();
    this.sourceFiles = [];
  }

  // 获取所有源文件
  getSourceFiles(dir = 'src') {
    const files = [];
    
    function traverse(currentDir) {
      try {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
          const itemPath = path.join(currentDir, item);
          const stat = fs.statSync(itemPath);
          
          if (stat.isDirectory()) {
            traverse(itemPath);
          } else if (item.match(/\.(ts|tsx|js|jsx)$/)) {
            files.push(itemPath);
          }
        }
      } catch (err) {
        console.warn(`Warning: Cannot read directory ${currentDir}`);
      }
    }
    
    traverse(dir);
    
    // 也检查配置文件
    const configFiles = [
      'next.config.js',
      'next.config.ts',
      'tailwind.config.js',
      'tailwind.config.ts',
      '.eslintrc.json',
      '.eslintrc.js',
      'postcss.config.js',
      'postcss.config.mjs',
      'tsconfig.json'
    ];
    
    configFiles.forEach(file => {
      if (fs.existsSync(file)) {
        files.push(file);
      }
    });
    
    return files;
  }

  // 检查脚本文件
  checkScriptFiles() {
    if (fs.existsSync('scripts')) {
      const scriptFiles = fs.readdirSync('scripts')
        .filter(file => file.endsWith('.js'))
        .map(file => path.join('scripts', file));
      
      return scriptFiles;
    }
    return [];
  }

  // 分析文件中的导入
  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 匹配各种导入模式
      const importPatterns = [
        // ES6 imports
        /import\s+[^'"]*['"]([^'"]+)['"]/g,
        // require statements
        /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
        // dynamic imports
        /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
        // next.js specific
        /from\s+['"]([^'"]+)['"]/g
      ];

      importPatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const importPath = match[1];
          
          // 提取包名
          if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
            let packageName = importPath;
            
            // 处理作用域包
            if (importPath.startsWith('@')) {
              const parts = importPath.split('/');
              packageName = parts.slice(0, 2).join('/');
            } else {
              packageName = importPath.split('/')[0];
            }
            
            if (this.dependencies[packageName]) {
              this.usedPackages.add(packageName);
            }
          }
        }
      });
    } catch (err) {
      console.warn(`Warning: Cannot read file ${filePath}`);
    }
  }

  // 检查 package.json 脚本中的依赖
  checkScriptDependencies() {
    const scripts = this.packageJson.scripts || {};
    
    Object.values(scripts).forEach(script => {
      // 检查脚本中使用的包
      Object.keys(this.dependencies).forEach(pkg => {
        if (script.includes(pkg)) {
          this.usedPackages.add(pkg);
        }
      });
    });
  }

  // 检查隐式依赖（框架自动使用的包）
  checkImplicitDependencies() {
    const implicitDeps = {
      'next': ['react', 'react-dom'], // Next.js 需要 React
      'tailwindcss': ['@tailwindcss/postcss'], // TailwindCSS 依赖
      'typescript': ['@types/node', '@types/react', '@types/react-dom'], // TypeScript 类型
      'eslint': ['eslint-config-next'], // ESLint 配置
    };

    Object.keys(implicitDeps).forEach(pkg => {
      if (this.usedPackages.has(pkg)) {
        implicitDeps[pkg].forEach(dep => {
          if (this.dependencies[dep]) {
            this.usedPackages.add(dep);
          }
        });
      }
    });
  }

  // 检查特殊用途的包
  checkSpecialPackages() {
    // Next.js 项目必需的包
    this.usedPackages.add('next');
    this.usedPackages.add('react');
    this.usedPackages.add('react-dom');
    
    // TypeScript 项目检查
    if (fs.existsSync('tsconfig.json')) {
      this.usedPackages.add('typescript');
      this.usedPackages.add('@types/node');
      this.usedPackages.add('@types/react');
      this.usedPackages.add('@types/react-dom');
    }
    
    // TailwindCSS 和相关包检查
    if (fs.existsSync('postcss.config.mjs') || fs.existsSync('postcss.config.js')) {
      this.usedPackages.add('@tailwindcss/postcss');
      this.usedPackages.add('tailwindcss');
      this.usedPackages.add('daisyui'); // DaisyUI 通过 TailwindCSS 使用
    }
    
    // ESLint 配置检查
    if (fs.existsSync('.eslintrc.json') || fs.existsSync('.eslintrc.js')) {
      this.usedPackages.add('eslint');
      this.usedPackages.add('eslint-config-next');
    }
    
    // 检查动画库的使用
    this.sourceFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Framer Motion 检查
        if (content.includes('framer-motion') || content.includes('motion.')) {
          this.usedPackages.add('framer-motion');
        }
        
        // 工具包检查
        if (content.includes('clsx') || content.includes('cn(')) {
          this.usedPackages.add('clsx');
        }
        
        if (content.includes('tailwind-merge') || content.includes('twMerge')) {
          this.usedPackages.add('tailwind-merge');
        }
        
        // WaveSurfer.js 检查
        if (content.includes('wavesurfer') || content.includes('WaveSurfer')) {
          this.usedPackages.add('wavesurfer.js');
        }
        
        // Lightbox 检查
        if (content.includes('yet-another-react-lightbox') || content.includes('Lightbox')) {
          this.usedPackages.add('yet-another-react-lightbox');
        }
      } catch (err) {
        // ignore
      }
    });
  }

  analyze() {
    console.log('🔍 Analyzing project dependencies...\n');
    
    // 获取所有源文件
    this.sourceFiles = [
      ...this.getSourceFiles('src'),
      ...this.checkScriptFiles()
    ];
    
    console.log(`📁 Found ${this.sourceFiles.length} source files to analyze`);
    
    // 分析每个文件
    this.sourceFiles.forEach(file => {
      this.analyzeFile(file);
    });
    
    // 检查脚本依赖
    this.checkScriptDependencies();
    
    // 检查隐式依赖
    this.checkImplicitDependencies();
    
    // 检查特殊包
    this.checkSpecialPackages();
    
    const allDeps = Object.keys(this.dependencies);
    const unusedDeps = allDeps.filter(dep => !this.usedPackages.has(dep));
    const usedDeps = allDeps.filter(dep => this.usedPackages.has(dep));
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 DEPENDENCY ANALYSIS RESULTS\n');
    
    console.log(`✅ USED DEPENDENCIES (${usedDeps.length}):`);
    usedDeps.sort().forEach(dep => {
      const version = this.dependencies[dep];
      const type = this.packageJson.dependencies?.[dep] ? 'production' : 'development';
      console.log(`  ✓ ${dep}@${version} (${type})`);
    });
    
    if (unusedDeps.length > 0) {
      console.log(`\n❌ POTENTIALLY UNUSED DEPENDENCIES (${unusedDeps.length}):`);
      console.log('⚠️  These packages are not detected in source code:');
      unusedDeps.sort().forEach(dep => {
        const version = this.dependencies[dep];
        const type = this.packageJson.dependencies?.[dep] ? 'production' : 'development';
        console.log(`  ? ${dep}@${version} (${type})`);
      });
      
      console.log('\n📝 To remove unused dependencies:');
      unusedDeps.forEach(dep => {
        console.log(`  npm uninstall ${dep}`);
      });
    } else {
      console.log('\n🎉 No unused dependencies found!');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📈 SUMMARY:');
    console.log(`📦 Total dependencies: ${allDeps.length}`);
    console.log(`✅ Used: ${usedDeps.length}`);
    console.log(`❌ Potentially unused: ${unusedDeps.length}`);
    console.log(`📊 Usage rate: ${Math.round((usedDeps.length / allDeps.length) * 100)}%`);
    
    return {
      used: usedDeps,
      unused: unusedDeps,
      total: allDeps.length
    };
  }
}

// 执行分析
if (require.main === module) {
  const checker = new DependencyChecker();
  const result = checker.analyze();
  
  // 如果有未使用的依赖，退出码为 1
  process.exit(result.unused.length > 0 ? 1 : 0);
}

module.exports = DependencyChecker;
