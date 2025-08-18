const fs = require('fs');
const path = require('path');
const { getAllTsxFiles, isComponentUsed, getComponentName } = require('./check-unused-components');

function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (err) {
    console.error(`❌ Failed to delete ${filePath}:`, err.message);
    return false;
  }
}

function isNextJsSpecialFile(filePath) {
  // Next.js special files that should not be deleted even if they appear "unused"
  const specialFiles = [
    'layout.tsx',
    'not-found.tsx',
    'page.tsx',
    'loading.tsx',
    'error.tsx',
    'global-error.tsx',
    'template.tsx'
  ];
  
  const fileName = path.basename(filePath);
  return specialFiles.includes(fileName);
}

function main() {
  const srcDir = path.join(process.cwd(), 'src');
  
  // Get all TSX component files (exclude unused directory)
  const componentFiles = getAllTsxFiles(srcDir, ['unused']);
  
  // Get all source files that could import components
  const sourceFiles = getAllTsxFiles(srcDir, []).concat(
    // Also include other file types that might import components
    getAllSourceFiles(srcDir)
  );
  
  console.log('🗑️  Checking for unused TSX components to delete...\n');
  
  const unusedComponents = [];
  const nextJsFiles = [];
  
  for (const componentFile of componentFiles) {
    const componentName = getComponentName(componentFile);
    const relativePath = path.relative(process.cwd(), componentFile);
    
    // Skip Next.js special files
    if (isNextJsSpecialFile(componentFile)) {
      nextJsFiles.push({
        name: componentName,
        path: relativePath,
        reason: 'Next.js special file'
      });
      continue;
    }
    
    if (!isComponentUsed(componentName, componentFile, sourceFiles)) {
      unusedComponents.push({
        name: componentName,
        path: relativePath,
        fullPath: componentFile
      });
    }
  }
  
  console.log(`📊 Analysis Results:`);
  console.log(`- Total components scanned: ${componentFiles.length}`);
  console.log(`- Next.js special files (skipped): ${nextJsFiles.length}`);
  console.log(`- Unused components found: ${unusedComponents.length}\n`);
  
  if (nextJsFiles.length > 0) {
    console.log('ℹ️  Skipped Next.js special files:');
    nextJsFiles.forEach(file => {
      console.log(`  - ${file.name} (${file.path}) - ${file.reason}`);
    });
    console.log();
  }
  
  if (unusedComponents.length === 0) {
    console.log('✅ No unused components found to delete!');
    return;
  }
  
  console.log(`🗑️  Found ${unusedComponents.length} unused component(s) to delete:\n`);
  unusedComponents.forEach(component => {
    console.log(`- ${component.name} (${component.path})`);
  });
  
  // Ask for confirmation (in a real scenario, but for automation we'll proceed)
  console.log('\n🚨 WARNING: This will permanently delete the above files!');
  console.log('Proceeding with deletion in 3 seconds...\n');
  
  // Small delay for visibility
  setTimeout(() => {
    let deletedCount = 0;
    let failedCount = 0;
    
    for (const component of unusedComponents) {
      console.log(`Deleting: ${component.path}`);
      if (deleteFile(component.fullPath)) {
        deletedCount++;
        console.log(`  ✅ Deleted successfully`);
      } else {
        failedCount++;
        console.log(`  ❌ Failed to delete`);
      }
    }
    
    console.log('\n📊 Deletion Summary:');
    console.log(`- Successfully deleted: ${deletedCount} files`);
    console.log(`- Failed to delete: ${failedCount} files`);
    
    if (deletedCount > 0) {
      console.log('\n🎉 Cleanup completed! Your project is now cleaner.');
    }
    
    if (failedCount > 0) {
      console.log('\n⚠️  Some files could not be deleted. Please check file permissions.');
      process.exit(1);
    }
  }, 3000);
}

// Helper function to get all source files
function getAllSourceFiles(dir) {
  const files = [];
  const extensions = ['.tsx', '.ts', '.js', '.jsx'];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        traverse(itemPath);
      } else if (extensions.some(ext => item.endsWith(ext)) && !item.endsWith('.d.ts')) {
        files.push(itemPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

if (require.main === module) {
  main();
}

module.exports = { deleteFile, isNextJsSpecialFile };
