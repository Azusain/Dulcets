const fs = require('fs');
const path = require('path');
const I18nChecker = require('./professional-i18n-check');

/**
 * Auto-translation helper for missing i18n keys
 * Inspired by Bytebase approach but for React/Next.js
 * 
 * NOTE: This uses a simple translation mapping approach.
 * For production use, consider integrating with Google Translate API
 * or other translation services.
 */

// Simple translation mapping for common words/phrases
const AUTO_TRANSLATIONS = {
  // Common UI elements
  'button': {
    en: 'button',
    jp: 'ボタン', 
    zh: '按钮'
  },
  'submit': {
    en: 'Submit',
    jp: '送信',
    zh: '提交'
  },
  'cancel': {
    en: 'Cancel', 
    jp: 'キャンセル',
    zh: '取消'
  },
  'loading': {
    en: 'Loading...',
    jp: '読み込み中...',
    zh: '加载中...'
  },
  'error': {
    en: 'Error',
    jp: 'エラー',
    zh: '错误'
  }
};

class AutoTranslator {
  constructor() {
    this.localesDir = path.join(process.cwd(), 'public/locales');
    this.translations = new Map();
    this.supportedLanguages = ['en', 'jp', 'zh'];
  }

  loadTranslations() {
    for (const lang of this.supportedLanguages) {
      const filePath = path.join(this.localesDir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          this.translations.set(lang, content);
        } catch (err) {
          console.error(`Error loading ${filePath}:`, err.message);
          this.translations.set(lang, {});
        }
      } else {
        this.translations.set(lang, {});
      }
    }
  }

  saveTranslations() {
    for (const [lang, content] of this.translations) {
      const filePath = path.join(this.localesDir, `${lang}.json`);
      try {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
        console.log(`✓ Updated ${lang}.json`);
      } catch (err) {
        console.error(`✗ Error saving ${filePath}:`, err.message);
      }
    }
  }

  // Set nested object property using dot notation
  setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = obj;

    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    current[lastKey] = value;
  }

  // Get nested object property using dot notation
  getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Simple auto-translation logic
  autoTranslate(key, sourceLanguage = 'en') {
    const translations = {};
    
    // 1. Check if we have predefined translations
    const lastPart = key.split('.').pop();
    if (AUTO_TRANSLATIONS[lastPart]) {
      return AUTO_TRANSLATIONS[lastPart];
    }

    // 2. Try to find similar keys in existing translations
    const sourceTranslation = this.getNestedProperty(this.translations.get(sourceLanguage), key);
    if (sourceTranslation) {
      translations[sourceLanguage] = sourceTranslation;
      
      // Look for similar translations in other languages
      for (const lang of this.supportedLanguages) {
        if (lang === sourceLanguage) continue;
        
        const existingTranslation = this.getNestedProperty(this.translations.get(lang), key);
        if (existingTranslation) {
          translations[lang] = existingTranslation;
        } else {
          // Use placeholder that indicates manual translation needed
          translations[lang] = `[${lang.toUpperCase()}] ${sourceTranslation || key}`;
        }
      }
    } else {
      // 3. Generate placeholder translations
      for (const lang of this.supportedLanguages) {
        translations[lang] = `[${lang.toUpperCase()}] ${key}`;
      }
    }

    return translations;
  }

  async addMissingTranslations(dryRun = false) {
    console.log('🔍 Analyzing missing translations...\n');
    
    // Use the professional i18n checker to find missing keys
    const checker = new I18nChecker();
    const analysis = checker.analyze();
    
    const { missingKeys } = analysis;
    
    if (missingKeys.length === 0) {
      console.log('🎉 No missing translations found!');
      return;
    }

    console.log(`\n📝 Processing ${missingKeys.length} missing keys...\n`);
    
    this.loadTranslations();
    
    let addedCount = 0;
    
    for (const key of missingKeys) {
      // Skip keys that look like they might be variable content
      if (this.shouldSkipKey(key)) {
        console.log(`⏭️  Skipping: ${key} (looks like dynamic content)`);
        continue;
      }
      
      console.log(`🔧 Processing: ${key}`);
      
      const translations = this.autoTranslate(key);
      
      for (const [lang, translation] of Object.entries(translations)) {
        if (!dryRun) {
          const currentTranslations = this.translations.get(lang);
          this.setNestedProperty(currentTranslations, key, translation);
        }
        console.log(`   ${lang}: "${translation}"`);
      }
      
      addedCount++;
      console.log('');
    }
    
    if (!dryRun && addedCount > 0) {
      this.saveTranslations();
      console.log(`\n✅ Added ${addedCount} translations to all language files.`);
      console.log('\n⚠️  Note: Placeholder translations were generated.');
      console.log('   Please review and update them with proper translations.');
    } else if (dryRun) {
      console.log(`\n📋 Dry run complete. Would add ${addedCount} translations.`);
      console.log('   Run with --execute to actually add them.');
    }
  }

  shouldSkipKey(key) {
    // Skip keys that look like email addresses, URLs, or other dynamic content
    const skipPatterns = [
      /\.(com|org|net|jp|info)$/i,
      /@/,
      /^https?:\/\//,
      /\${/,  // Template literal variables
      /\.[a-z]{2,4}$/i, // File extensions or domains
      /^[A-Z_]{2,}$/, // Constants
    ];
    
    return skipPatterns.some(pattern => pattern.test(key));
  }

  async fixInconsistentTranslations(dryRun = false) {
    console.log('🔍 Analyzing inconsistent translations...\n');
    
    const checker = new I18nChecker();
    const analysis = checker.analyze();
    
    const { inconsistentKeys } = analysis;
    
    if (Object.keys(inconsistentKeys).length === 0) {
      console.log('🎉 No inconsistent translations found!');
      return;
    }

    this.loadTranslations();
    
    for (const [key, missingLanguages] of Object.entries(inconsistentKeys)) {
      console.log(`🔧 Fixing: ${key} (missing in: ${missingLanguages.join(', ')})`);
      
      // Find the key in languages that have it
      let sourceTranslation = null;
      let sourceLang = null;
      
      for (const lang of this.supportedLanguages) {
        if (!missingLanguages.includes(lang)) {
          const translation = this.getNestedProperty(this.translations.get(lang), key);
          if (translation) {
            sourceTranslation = translation;
            sourceLang = lang;
            break;
          }
        }
      }
      
      if (sourceTranslation) {
        // Add placeholder translations to missing languages
        for (const lang of missingLanguages) {
          const placeholder = `[${lang.toUpperCase()}] ${sourceTranslation}`;
          console.log(`   Adding to ${lang}: "${placeholder}"`);
          
          if (!dryRun) {
            const currentTranslations = this.translations.get(lang);
            this.setNestedProperty(currentTranslations, key, placeholder);
          }
        }
      }
    }
    
    if (!dryRun) {
      this.saveTranslations();
      console.log('\n✅ Fixed inconsistent translations.');
    } else {
      console.log('\n📋 Dry run complete. Run with --execute to fix inconsistencies.');
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--execute');
  const mode = args.includes('--inconsistent') ? 'inconsistent' : 'missing';
  
  if (dryRun) {
    console.log('🚀 Running in DRY RUN mode. Use --execute to apply changes.\n');
  }
  
  const translator = new AutoTranslator();
  
  if (mode === 'inconsistent') {
    await translator.fixInconsistentTranslations(dryRun);
  } else {
    await translator.addMissingTranslations(dryRun);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutoTranslator;
