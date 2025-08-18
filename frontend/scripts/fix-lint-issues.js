const fs = require('fs');
const path = require('path');

/**
 * 自动修复一些常见的 lint 问题
 */

class LintFixer {
  constructor() {
    this.fixedFiles = [];
    this.issues = {
      unusedVars: 0,
      anyTypes: 0,
      requireImports: 0,
      constPreference: 0
    };
  }

  // 获取所有 TypeScript/JavaScript 文件
  getSourceFiles() {
    const files = [];
    
    function traverse(currentDir) {
      try {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
          const itemPath = path.join(currentDir, item);
          const stat = fs.statSync(itemPath);
          
          if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.next')) {
            traverse(itemPath);
          } else if (item.match(/\.(ts|tsx|js|jsx)$/)) {
            files.push(itemPath);
          }
        }
      } catch (err) {
        console.warn(`Warning: Cannot read directory ${currentDir}`);
      }
    }
    
    traverse('src');
    return files;
  }

  // 修复单个文件
  fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let hasChanges = false;
      const originalContent = content;

      // 1. 修复未使用的变量（在错误处理中）
      content = content.replace(
        /catch\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)\s*\{([^}]*)\}/g,
        (match, varName, body) => {
          if (!body.includes(varName) && !body.includes('console.')) {
            this.issues.unusedVars++;
            return `catch (_${varName}) {${body}}`;
          }
          return match;
        }
      );

      // 2. 修复 prefer-const
      content = content.replace(
        /let\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^;\n]+);/g,
        (match, varName, value) => {
          // 简单检查：如果变量后面没有被重新赋值
          const restOfContent = content.slice(content.indexOf(match) + match.length);
          const hasReassignment = new RegExp(`\\b${varName}\\s*=`).test(restOfContent);
          
          if (!hasReassignment && !varName.includes('Controller')) {
            this.issues.constPreference++;
            return `const ${varName} = ${value};`;
          }
          return match;
        }
      );

      // 3. 修复 require() 导入为 import
      content = content.replace(
        /import\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*require\(["']([^"']+)["']\);?/g,
        (match, varName, modulePath) => {
          this.issues.requireImports++;
          return `import ${varName} from "${modulePath}";`;
        }
      );

      // 检查是否有变化
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.fixedFiles.push(filePath);
        hasChanges = true;
      }

      return hasChanges;
    } catch (err) {
      console.warn(`Warning: Cannot fix file ${filePath}: ${err.message}`);
      return false;
    }
  }

  // 修复所有文件
  fixAll() {
    console.log('🔧 Starting automated lint fixes...\n');
    
    const files = this.getSourceFiles();
    console.log(`📁 Found ${files.length} source files to check`);
    
    let totalFixed = 0;
    
    files.forEach(file => {
      const wasFixed = this.fixFile(file);
      if (wasFixed) {
        totalFixed++;
      }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 LINT FIX RESULTS\n');
    
    if (totalFixed > 0) {
      console.log(`✅ FIXED FILES (${totalFixed}):`);
      this.fixedFiles.forEach(file => {
        console.log(`  ✓ ${file}`);
      });
      
      console.log(`\n🔧 ISSUES FIXED:`);
      console.log(`  • Unused variables: ${this.issues.unusedVars}`);
      console.log(`  • Any types: ${this.issues.anyTypes}`);
      console.log(`  • Require imports: ${this.issues.requireImports}`);
      console.log(`  • Const preferences: ${this.issues.constPreference}`);
      
      console.log('\n📝 Remaining issues may need manual attention:');
      console.log('  • @typescript-eslint/no-explicit-any - Replace any types with specific types');
      console.log('  • @next/next/no-img-element - Use Next.js Image component');
      console.log('  • react-hooks/exhaustive-deps - Add missing dependencies or use useCallback');
      console.log('  • @next/next/no-html-link-for-pages - Use Next.js Link component');
      
    } else {
      console.log('🎉 No automatically fixable issues found!');
    }
    
    console.log('\n💡 To see remaining issues:');
    console.log('  npm run lint');
  }
}

// 执行修复
if (require.main === module) {
  const fixer = new LintFixer();
  fixer.fixAll();
}

module.exports = LintFixer;
