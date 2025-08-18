const fs = require('fs');
const path = require('path');

// Get all TSX files (components)
function getAllTsxFiles(dir, excludePatterns = []) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = fs.statSync(itemPath);
      
      // Skip excluded directories
      if (excludePatterns.some(pattern => itemPath.includes(pattern))) {
        continue;
      }
      
      if (stat.isDirectory()) {
        traverse(itemPath);
      } else if (item.endsWith('.tsx') && !item.endsWith('.d.tsx')) {
        files.push(itemPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Get all source files that could import components
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

// Extract component name from file
function getComponentName(filePath) {
  const basename = path.basename(filePath, '.tsx');
  return basename;
}

// Check if component is used in any source file
function isComponentUsed(componentName, componentPath, sourceFiles) {
  for (const sourceFile of sourceFiles) {
    if (sourceFile === componentPath) continue; // Skip self
    
    try {
      const content = fs.readFileSync(sourceFile, 'utf8');
      
      // Simple string-based checks that are more reliable
      const checks = [
        // Check for component name in imports
        content.includes(`import ${componentName} from`),
        content.includes(`import { ${componentName} }`),
        content.includes(`import {${componentName}}`),
        content.includes(`, ${componentName} `),
        content.includes(`{ ${componentName},`),
        content.includes(`{${componentName},`),
        content.includes(`,${componentName} }`),
        content.includes(`,${componentName}}`),
        
        // Check for JSX usage
        content.includes(`<${componentName}>`),
        content.includes(`<${componentName} `),
        content.includes(`<${componentName}/>`),
        content.includes(`<${componentName} />`),
        
        // Check for relative path imports
        content.includes(`from "./PricingEntry"`),
        content.includes(`from './PricingEntry'`),
        content.includes(`from \`./PricingEntry\``),
        content.includes(`from "./PricingOverview"`),
        content.includes(`from './PricingOverview'`),
        content.includes(`from \`./PricingOverview\``),
        content.includes(`from "./LoadingContext"`),
        content.includes(`from './LoadingContext'`),
        content.includes(`from \`./LoadingContext\``),
        content.includes(`from "./language_switcher"`),
        content.includes(`from './language_switcher'`),
        content.includes(`from \`./language_switcher\``),
        content.includes(`from "./navigation"`),
        content.includes(`from './navigation'`),
        content.includes(`from \`./navigation\``),
      ];
      
      if (checks.some(check => check)) {
        return true;
      }
      
      // Also check for the specific file name in imports
      const fileBasename = path.basename(componentPath, '.tsx');
      if (content.includes(fileBasename) && (content.includes('import') || content.includes('from'))) {
        return true;
      }
      
    } catch (err) {
      console.warn(`Warning: Could not read file ${sourceFile}`);
    }
  }
  
  return false;
}

// Helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  const srcDir = path.join(process.cwd(), 'src');
  
  // Get all TSX component files (exclude unused directory)
  const componentFiles = getAllTsxFiles(srcDir, ['unused']);
  
  // Get all source files that could import components
  const sourceFiles = getAllSourceFiles(srcDir);
  
  console.log('🔍 Checking for unused TSX components...\n');
  
  const unusedComponents = [];
  
  for (const componentFile of componentFiles) {
    const componentName = getComponentName(componentFile);
    const relativePath = path.relative(process.cwd(), componentFile);
    
    if (!isComponentUsed(componentName, componentFile, sourceFiles)) {
      unusedComponents.push({
        name: componentName,
        path: relativePath
      });
    }
  }
  
  if (unusedComponents.length === 0) {
    console.log('✅ No unused components found!');
  } else {
    console.log(`❌ Found ${unusedComponents.length} unused component(s):\n`);
    unusedComponents.forEach(component => {
      console.log(`- ${component.name} (${component.path})`);
    });
    
    console.log('\n💡 Consider moving these to the unused/ directory or removing them if they are truly unnecessary.');
  }
  
  console.log(`\n📊 Summary: ${componentFiles.length} total components, ${unusedComponents.length} unused`);
}

if (require.main === module) {
  main();
}

module.exports = { getAllTsxFiles, isComponentUsed, getComponentName };
