const fs = require('fs');
const path = require('path');

// Get all translation files
function getTranslationFiles(localesDir) {
  if (!fs.existsSync(localesDir)) {
    throw new Error(`Locales directory not found: ${localesDir}`);
  }
  
  const files = fs.readdirSync(localesDir)
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      language: path.basename(file, '.json'),
      path: path.join(localesDir, file)
    }));
    
  return files;
}

// Load and parse translation file
function loadTranslations(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err.message);
    return {};
  }
}

// Get all keys from translation object (including nested)
function getAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// Get all source files that could use translations
function getSourceFiles(dir) {
  const files = [];
  const extensions = ['.tsx', '.ts', '.js', '.jsx'];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        traverse(itemPath);
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(itemPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Check if translation key is used in source code
function isKeyUsed(key, sourceFiles) {
  const keyPatterns = [
    new RegExp(`['"\`]${key}['"\`]`, 'g'), // Direct key usage
    new RegExp(`t\\s*\\(\\s*['"\`]${key}['"\`]`, 'g'), // t('key') pattern
    new RegExp(`t\\s*\\(\\s*['"\`]${key.replace(/\./g, '\\.')}['"\`]`, 'g'), // Escaped dots
  ];
  
  for (const sourceFile of sourceFiles) {
    try {
      const content = fs.readFileSync(sourceFile, 'utf8');
      
      if (keyPatterns.some(pattern => pattern.test(content))) {
        return true;
      }
    } catch (err) {
      console.warn(`Warning: Could not read file ${sourceFile}`);
    }
  }
  
  return false;
}

function checkUnusedKeys() {
  console.log('🔍 Checking for unused i18n keys...\n');
  
  const localesDir = path.join(process.cwd(), 'public', 'locales');
  const srcDir = path.join(process.cwd(), 'src');
  
  const translationFiles = getTranslationFiles(localesDir);
  const sourceFiles = getSourceFiles(srcDir);
  
  if (translationFiles.length === 0) {
    console.log('❌ No translation files found!');
    return;
  }
  
  // Get all keys from the first language file as reference
  const primaryLang = translationFiles[0];
  const primaryTranslations = loadTranslations(primaryLang.path);
  const allKeys = getAllKeys(primaryTranslations);
  
  console.log(`📚 Found ${allKeys.length} translation keys in ${primaryLang.language}.json`);
  
  const unusedKeys = [];
  
  for (const key of allKeys) {
    if (!isKeyUsed(key, sourceFiles)) {
      unusedKeys.push(key);
    }
  }
  
  if (unusedKeys.length === 0) {
    console.log('✅ All translation keys are being used!');
  } else {
    console.log(`❌ Found ${unusedKeys.length} unused translation key(s):\n`);
    unusedKeys.forEach(key => {
      console.log(`- ${key}`);
    });
    
    console.log('\n💡 Consider removing these unused keys from all language files.');
  }
  
  return unusedKeys;
}

function checkMissingTranslations() {
  console.log('\n🔍 Checking for missing translations across languages...\n');
  
  const localesDir = path.join(process.cwd(), 'public', 'locales');
  const translationFiles = getTranslationFiles(localesDir);
  
  if (translationFiles.length < 2) {
    console.log('ℹ️  Only one language file found, skipping consistency check.');
    return;
  }
  
  // Load all translations
  const translations = {};
  for (const file of translationFiles) {
    translations[file.language] = loadTranslations(file.path);
  }
  
  // Get all unique keys across all languages
  const allUniqueKeys = new Set();
  for (const lang in translations) {
    const keys = getAllKeys(translations[lang]);
    keys.forEach(key => allUniqueKeys.add(key));
  }
  
  console.log(`📋 Found ${allUniqueKeys.size} unique keys across ${Object.keys(translations).length} languages`);
  
  // Check for missing keys in each language
  const missingTranslations = {};
  
  for (const key of allUniqueKeys) {
    for (const lang in translations) {
      const hasKey = hasNestedKey(translations[lang], key);
      
      if (!hasKey) {
        if (!missingTranslations[lang]) {
          missingTranslations[lang] = [];
        }
        missingTranslations[lang].push(key);
      }
    }
  }
  
  // Report results
  let hasIssues = false;
  for (const lang in missingTranslations) {
    if (missingTranslations[lang].length > 0) {
      hasIssues = true;
      console.log(`❌ Missing translations in ${lang}.json (${missingTranslations[lang].length} keys):`);
      missingTranslations[lang].forEach(key => {
        console.log(`  - ${key}`);
      });
      console.log();
    }
  }
  
  if (!hasIssues) {
    console.log('✅ All languages have consistent translations!');
  }
  
  return missingTranslations;
}

// Helper function to check if nested key exists
function hasNestedKey(obj, key) {
  const keys = key.split('.');
  let current = obj;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return false;
    }
  }
  
  return true;
}

function main() {
  console.log('🌍 I18n Checker\n');
  console.log('=' * 50);
  
  try {
    const unusedKeys = checkUnusedKeys();
    const missingTranslations = checkMissingTranslations();
    
    console.log('\n📊 Summary:');
    console.log(`- Unused keys: ${unusedKeys ? unusedKeys.length : 0}`);
    
    let totalMissing = 0;
    if (missingTranslations) {
      for (const lang in missingTranslations) {
        totalMissing += missingTranslations[lang].length;
      }
    }
    console.log(`- Missing translations: ${totalMissing}`);
    
    if ((unusedKeys && unusedKeys.length > 0) || totalMissing > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { 
  getTranslationFiles, 
  loadTranslations, 
  getAllKeys, 
  isKeyUsed, 
  hasNestedKey,
  checkUnusedKeys,
  checkMissingTranslations
};
