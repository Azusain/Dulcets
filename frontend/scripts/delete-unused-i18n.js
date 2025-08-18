const fs = require('fs');
const path = require('path');
const { 
  getTranslationFiles, 
  loadTranslations, 
  getAllKeys, 
  isKeyUsed 
} = require('./check-i18n');

function deleteKeyFromObject(obj, keyPath) {
  const keys = keyPath.split('.');
  let current = obj;
  
  // Navigate to the parent of the target key
  for (let i = 0; i < keys.length - 1; i++) {
    if (current && typeof current === 'object' && keys[i] in current) {
      current = current[keys[i]];
    } else {
      return false; // Key path doesn't exist
    }
  }
  
  // Delete the final key
  const finalKey = keys[keys.length - 1];
  if (current && typeof current === 'object' && finalKey in current) {
    delete current[finalKey];
    return true;
  }
  
  return false;
}

function cleanupEmptyObjects(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        cleanupEmptyObjects(obj[key]);
        
        // Delete empty objects
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    }
  }
}

function saveTranslations(filePath, translations) {
  try {
    const jsonString = JSON.stringify(translations, null, 2);
    fs.writeFileSync(filePath, jsonString, 'utf8');
    return true;
  } catch (err) {
    console.error(`❌ Failed to save ${filePath}:`, err.message);
    return false;
  }
}

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

function main() {
  console.log('🗑️  Checking for unused i18n keys to delete...\n');
  
  const localesDir = path.join(process.cwd(), 'public', 'locales');
  const srcDir = path.join(process.cwd(), 'src');
  
  try {
    const translationFiles = getTranslationFiles(localesDir);
    const sourceFiles = getSourceFiles(srcDir);
    
    if (translationFiles.length === 0) {
      console.log('❌ No translation files found!');
      return;
    }
    
    console.log(`📚 Found ${translationFiles.length} translation files`);
    console.log(`📁 Scanning ${sourceFiles.length} source files\n`);
    
    // Load all translations
    const allTranslations = {};
    const allKeys = new Set();
    
    for (const file of translationFiles) {
      const translations = loadTranslations(file.path);
      allTranslations[file.language] = translations;
      
      // Collect all keys from this language
      const keys = getAllKeys(translations);
      keys.forEach(key => allKeys.add(key));
    }
    
    console.log(`🔍 Found ${allKeys.size} unique translation keys across all languages\n`);
    
    // Find unused keys
    const unusedKeys = [];
    let checkedCount = 0;
    
    for (const key of allKeys) {
      checkedCount++;
      if (checkedCount % 50 === 0) {
        console.log(`Progress: ${checkedCount}/${allKeys.size} keys checked...`);
      }
      
      if (!isKeyUsed(key, sourceFiles)) {
        unusedKeys.push(key);
      }
    }
    
    console.log(`\n📊 Analysis complete:`);
    console.log(`- Total keys: ${allKeys.size}`);
    console.log(`- Unused keys: ${unusedKeys.length}`);
    console.log(`- Used keys: ${allKeys.size - unusedKeys.length}\n`);
    
    if (unusedKeys.length === 0) {
      console.log('✅ No unused translation keys found!');
      return;
    }
    
    console.log(`🗑️  Found ${unusedKeys.length} unused translation key(s):\n`);
    unusedKeys.slice(0, 20).forEach(key => {
      console.log(`- ${key}`);
    });
    
    if (unusedKeys.length > 20) {
      console.log(`... and ${unusedKeys.length - 20} more keys`);
    }
    
    console.log('\n🚨 WARNING: This will permanently delete these keys from ALL translation files!');
    console.log('Proceeding with deletion in 3 seconds...\n');
    
    // Small delay for visibility
    setTimeout(() => {
      let totalDeleted = 0;
      let totalFailed = 0;
      
      // Delete unused keys from all translation files
      for (const file of translationFiles) {
        console.log(`\nProcessing ${file.language}.json...`);
        
        const translations = { ...allTranslations[file.language] };
        let deletedInFile = 0;
        let failedInFile = 0;
        
        for (const key of unusedKeys) {
          if (deleteKeyFromObject(translations, key)) {
            deletedInFile++;
          } else {
            failedInFile++;
          }
        }
        
        // Clean up empty objects
        cleanupEmptyObjects(translations);
        
        // Save the updated translations
        if (deletedInFile > 0) {
          if (saveTranslations(file.path, translations)) {
            console.log(`  ✅ Deleted ${deletedInFile} keys from ${file.language}.json`);
            totalDeleted += deletedInFile;
          } else {
            console.log(`  ❌ Failed to save ${file.language}.json`);
            totalFailed += deletedInFile;
          }
        } else {
          console.log(`  ℹ️  No keys to delete in ${file.language}.json`);
        }
        
        if (failedInFile > 0) {
          console.log(`  ⚠️  ${failedInFile} keys not found in ${file.language}.json`);
        }
      }
      
      console.log('\n📊 Deletion Summary:');
      console.log(`- Successfully deleted: ${totalDeleted} key instances`);
      console.log(`- Failed to delete: ${totalFailed} key instances`);
      
      if (totalDeleted > 0) {
        console.log('\n🎉 i18n cleanup completed! Your translation files are now cleaner.');
        console.log('💡 Consider running the i18n checker again to verify the cleanup.');
      }
      
      if (totalFailed > 0) {
        console.log('\n⚠️  Some operations failed. Please check file permissions and try again.');
        process.exit(1);
      }
    }, 3000);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { deleteKeyFromObject, cleanupEmptyObjects, saveTranslations };
