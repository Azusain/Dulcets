const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Project Health Check\n');
console.log('='.repeat(50));

async function runScript(scriptName, description) {
  return new Promise((resolve, reject) => {
    console.log(`\n📋 ${description}\n`);
    
    const scriptPath = path.join(__dirname, scriptName);
    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
      
      if (error && error.code !== 0) {
        console.log(`⚠️  ${description} completed with warnings/errors`);
        resolve({ success: false, error: error.message });
      } else {
        console.log(`✅ ${description} completed successfully`);
        resolve({ success: true });
      }
    });
  });
}

async function main() {
  const checks = [
    {
      script: 'check-unused-components.js',
      description: 'Checking for unused TSX components'
    },
    {
      script: 'professional-i18n-check.js', 
      description: 'Checking i18n translations'
    },
    {
      script: 'check-unused-dependencies.js',
      description: 'Checking unused dependencies'
    }
  ];
  
  let allPassed = true;
  const results = [];
  
  for (const check of checks) {
    try {
      const result = await runScript(check.script, check.description);
      results.push({
        name: check.description,
        ...result
      });
      
      if (!result.success) {
        allPassed = false;
      }
    } catch (err) {
      console.error(`❌ Failed to run ${check.description}:`, err.message);
      allPassed = false;
      results.push({
        name: check.description,
        success: false,
        error: err.message
      });
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Final Summary:');
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    if (result.error && !result.success) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  if (allPassed) {
    console.log('\n🎉 All checks passed! Your project is healthy.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some checks failed. Please review the output above.');
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('❌ Script execution failed:', err.message);
    process.exit(1);
  });
}
