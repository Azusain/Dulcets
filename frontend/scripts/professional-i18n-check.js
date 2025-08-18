const fs = require('fs');
const path = require('path');

/**
 * Professional i18n checker inspired by Bytebase approach
 * Designed specifically for React/Next.js projects
 */

// Configuration
const CONFIG = {
  localesDir: 'public/locales',
  sourceDir: 'src',
  extensions: ['.tsx', '.ts', '.js', '.jsx'],
  // Patterns to ignore when detecting keys
  ignorePatterns: [
    /^https?:\/\//, // URLs
    /^[A-Z_]{2,}$/, // Constants
    /^[0-9]+$/, // Pure numbers  
    /^[a-f0-9]{8,}$/i, // Hex strings
    /\s/, // Contains spaces
    /^\.\//, // Relative paths
    /^\//,  // Absolute paths
    /\.(jpg|jpeg|png|gif|svg|mp3|mp4|pdf)$/i // File extensions
  ],
  // Dynamic key patterns we know about in this project
  knownDynamicPatterns: [
    {
      // about.genres.${genre}.content pattern
      pattern: /t\(`about\.genres\.\$\{[^}]+\}\.content`\)/g,
      generateKeys: () => ['idol', 'jrock', 'jpop', 'orchestra', 'edm', 'bgm']
        .map(genre => `about.genres.${genre}.content`)
    },
    {
      // about.genres.${genre}.title pattern
      pattern: /t\(`about\.genres\.\$\{[^}]+\}\.title`\)/g,
      generateKeys: () => ['idol', 'jrock', 'jpop', 'orchestra', 'edm', 'bgm']
        .map(genre => `about.genres.${genre}.title`)
    },
    {
      // about.genres.${genre}.subtitle pattern
      pattern: /t\(`about\.genres\.\$\{[^}]+\}\.subtitle`\)/g,
      generateKeys: () => ['idol', 'jrock', 'jpop', 'orchestra', 'edm', 'bgm']
        .map(genre => `about.genres.${genre}.subtitle`)
    },
    {
      // about.why_choose_us.features.${feature}.title pattern
      pattern: /t\(`about\.why_choose_us\.features\.\$\{[^}]+\}\.title`\)/g,
      generateKeys: () => ['custom_music', 'comprehensive_support', 'diverse_vocals', 'multilingual', 'cross_media']
        .map(feature => `about.why_choose_us.features.${feature}.title`)
    },
    {
      // about.why_choose_us.features.${feature}.description pattern
      pattern: /t\(`about\.why_choose_us\.features\.\$\{[^}]+\}\.description`\)/g,
      generateKeys: () => ['custom_music', 'comprehensive_support', 'diverse_vocals', 'multilingual', 'cross_media']
        .map(feature => `about.why_choose_us.features.${feature}.description`)
    },
    {
      // music_production_section.services.${service}.* pattern
      pattern: /t\(`music_production_section\.services\.\$\{[^}]+\}\./g,
      generateKeys: () => {
        const services = ['vocal_mixing', 'mixing_mastering', 'music_production'];
        const props = ['title', 'subtitle', 'description', 'price'];
        const keys = [];
        for (const service of services) {
          for (const prop of props) {
            keys.push(`music_production_section.services.${service}.${prop}`);
          }
        }
        return keys;
      }
    }
  ]
};

class I18nChecker {
  constructor() {
    this.usedKeys = new Set();
    this.translationKeys = new Map(); // lang -> Set of keys
    this.dynamicKeys = new Set();
  }

  // Get all source files
  getSourceFiles(dir = CONFIG.sourceDir) {
    const files = [];
    
    function traverse(currentDir) {
      try {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
          const itemPath = path.join(currentDir, item);
          const stat = fs.statSync(itemPath);
          
          if (stat.isDirectory()) {
            traverse(itemPath);
          } else if (CONFIG.extensions.some(ext => item.endsWith(ext))) {
            files.push(itemPath);
          }
        }
      } catch (err) {
        console.warn(`Warning: Cannot read directory ${currentDir}`);
      }
    }
    
    traverse(dir);
    return files;
  }

  // Load translation files
  loadTranslations() {
    const localesPath = path.join(process.cwd(), CONFIG.localesDir);
    
    if (!fs.existsSync(localesPath)) {
      throw new Error(`Locales directory not found: ${localesPath}`);
    }
    
    const files = fs.readdirSync(localesPath)
      .filter(file => file.endsWith('.json'));
    
    for (const file of files) {
      const lang = path.basename(file, '.json');
      const filePath = path.join(localesPath, file);
      
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        this.translationKeys.set(lang, new Set(this.getAllKeys(content)));
      } catch (err) {
        console.error(`Error loading ${filePath}:`, err.message);
      }
    }
  }

  // Get all keys from nested object
  getAllKeys(obj, prefix = '') {
    const keys = [];
    
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...this.getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  }

  // Extract keys from source code
  extractKeysFromSource() {
    const sourceFiles = this.getSourceFiles();
    console.log(`📁 Scanning ${sourceFiles.length} source files...`);
    
    for (const filePath of sourceFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        this.extractKeysFromContent(content, filePath);
      } catch (err) {
        console.warn(`Warning: Cannot read ${filePath}`);
      }
    }
  }

  extractKeysFromContent(content, filePath) {
    // 1. Extract static keys
    const staticPatterns = [
      // t("key") or t('key') or t(`key`)
      /t\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g,
      // getTranslation(translations, "key")
      /getTranslation\s*\([^,]+,\s*["'`]([^"'`]+)["'`]\s*\)/g,
      // Direct string literals that look like i18n keys
      /["'`]([a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+?)["'`]/g
    ];

    for (const pattern of staticPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const key = match[1];
        if (this.isValidI18nKey(key)) {
          this.usedKeys.add(key);
        }
      }
    }

    // 2. Handle dynamic patterns
    for (const dynamicPattern of CONFIG.knownDynamicPatterns) {
      if (dynamicPattern.pattern.test(content)) {
        const generatedKeys = dynamicPattern.generateKeys();
        generatedKeys.forEach(key => {
          this.usedKeys.add(key);
          this.dynamicKeys.add(key);
        });
      }
    }
  }

  isValidI18nKey(key) {
    return key && 
           key.length > 1 && 
           key.length < 100 &&
           !CONFIG.ignorePatterns.some(pattern => pattern.test(key));
  }

  // Analyze and report results
  analyze() {
    console.log('🔍 Professional i18n Analysis\n');
    console.log('='.repeat(50));
    
    this.loadTranslations();
    this.extractKeysFromSource();
    
    const languages = Array.from(this.translationKeys.keys());
    console.log(`\n📚 Found ${languages.length} languages: ${languages.join(', ')}`);
    
    // Get all unique translation keys across languages
    const allTranslationKeys = new Set();
    for (const [lang, keys] of this.translationKeys) {
      console.log(`  - ${lang}: ${keys.size} keys`);
      keys.forEach(key => allTranslationKeys.add(key));
    }
    
    console.log(`\n🔑 Analysis Results:`);
    console.log(`  - Keys used in code: ${this.usedKeys.size}`);
    console.log(`  - Keys in translations: ${allTranslationKeys.size}`);
    console.log(`  - Dynamic keys detected: ${this.dynamicKeys.size}`);
    
    // Find unused keys
    const unusedKeys = [...allTranslationKeys].filter(key => !this.usedKeys.has(key));
    
    // Find missing keys
    const missingKeys = [...this.usedKeys].filter(key => !allTranslationKeys.has(key));
    
    // Find inconsistent keys across languages
    const inconsistentKeys = this.findInconsistentKeys();
    
    this.reportResults(unusedKeys, missingKeys, inconsistentKeys);
    
    return {
      unusedKeys,
      missingKeys, 
      inconsistentKeys,
      usedKeys: [...this.usedKeys],
      dynamicKeys: [...this.dynamicKeys]
    };
  }

  findInconsistentKeys() {
    if (this.translationKeys.size < 2) return {};
    
    const languages = Array.from(this.translationKeys.keys());
    const inconsistencies = {};
    
    // Get all possible keys
    const allKeys = new Set();
    this.translationKeys.forEach(keys => keys.forEach(key => allKeys.add(key)));
    
    for (const key of allKeys) {
      const missingIn = [];
      for (const lang of languages) {
        if (!this.translationKeys.get(lang).has(key)) {
          missingIn.push(lang);
        }
      }
      
      if (missingIn.length > 0 && missingIn.length < languages.length) {
        inconsistencies[key] = missingIn;
      }
    }
    
    return inconsistencies;
  }

  reportResults(unusedKeys, missingKeys, inconsistentKeys) {
    console.log('\n' + '='.repeat(50));
    console.log('📋 DETAILED REPORT\n');
    
    // Used keys (first 10)
    const usedKeysArray = [...this.usedKeys].sort();
    console.log(`✅ USED KEYS (${usedKeysArray.length} total):`);
    usedKeysArray.slice(0, 20).forEach(key => {
      const isDynamic = this.dynamicKeys.has(key) ? ' 🔄' : '';
      console.log(`  ✓ ${key}${isDynamic}`);
    });
    if (usedKeysArray.length > 10) {
      console.log(`  ... and ${usedKeysArray.length - 10} more`);
    }
    
    // Missing keys
    if (missingKeys.length > 0) {
      console.log(`\n❌ MISSING IN TRANSLATIONS (${missingKeys.length}):`);
      missingKeys.forEach(key => console.log(`  ✗ ${key}`));
    }
    
    // Inconsistent keys  
    const inconsistentCount = Object.keys(inconsistentKeys).length;
    if (inconsistentCount > 0) {
      console.log(`\n⚠️  INCONSISTENT ACROSS LANGUAGES (${inconsistentCount}):`);
      for (const [key, missingLanguages] of Object.entries(inconsistentKeys)) {
        console.log(`  ⚠ ${key} (missing in: ${missingLanguages.join(', ')})`);
      }
    }
    
    // Potentially unused keys
    if (unusedKeys.length > 0) {
      console.log(`\n🤔 POTENTIALLY UNUSED (${unusedKeys.length}):`);
      console.log('⚠️  These keys exist in translations but were not detected in source code.');
      console.log('⚠️  This could be due to:');
      console.log('   - Complex dynamic key construction not covered by patterns');
      console.log('   - Keys used in external libraries or frameworks');
      console.log('   - Server-side only usage');
      console.log('   - Keys that are actually unused\n');
      
      unusedKeys.slice(0, 20).forEach(key => console.log(`  ? ${key}`));
      if (unusedKeys.length > 20) {
        console.log(`  ... and ${unusedKeys.length - 20} more`);
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 SUMMARY:');
    console.log(`✅ Used keys: ${this.usedKeys.size}`);
    console.log(`❌ Missing translations: ${missingKeys.length}`);
    console.log(`⚠️  Inconsistent keys: ${inconsistentCount}`);
    console.log(`🤔 Potentially unused: ${unusedKeys.length}`);
    
    if (missingKeys.length > 0 || inconsistentCount > 0) {
      console.log('\n🚨 Action required: Fix missing translations and inconsistencies');
      return false;
    } else {
      console.log('\n🎉 Your i18n setup looks good!');
      return true;
    }
  }
}

// Main execution
if (require.main === module) {
  const checker = new I18nChecker();
  const isHealthy = checker.analyze();
  
  process.exit(isHealthy ? 0 : 1);
}

module.exports = I18nChecker;
