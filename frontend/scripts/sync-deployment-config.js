#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Sync deployment configuration from package.json to deployment.ts at build time
 */
function syncDeploymentConfig() {
  try {
    // Read package.json
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    if (!packageJson.deployment) {
      console.log('⚠️  No deployment config found in package.json, using defaults');
      return;
    }

    // Read deployment.ts
    const deploymentPath = path.join(__dirname, '..', 'src', 'utils', 'deployment.ts');
    let deploymentContent = fs.readFileSync(deploymentPath, 'utf8');
    
    // Create the new config object
    const newConfig = {
      production: packageJson.deployment.production || {
        domain: 'https://dulcetsinfo.wixsite.com',
        basePath: ''
      },
      github: packageJson.deployment.github || {
        domain: 'https://azusain.github.io',
        basePath: '/Dulcets'
      },
      development: packageJson.deployment.development || {
        domain: 'http://localhost:3000',
        basePath: ''
      }
    };

    // Replace the DEFAULT_CONFIG in deployment.ts
    const configString = JSON.stringify(newConfig, null, 2);
    const newDeploymentContent = deploymentContent.replace(
      /const DEFAULT_CONFIG = {[\s\S]*?};/,
      `const DEFAULT_CONFIG = ${configString};`
    );

    // Write back to file
    fs.writeFileSync(deploymentPath, newDeploymentContent, 'utf8');
    
    console.log('✅ Deployment configuration synced from package.json');
    console.log(`📡 Production domain: ${newConfig.production.domain}`);
    console.log(`📂 Production base path: ${newConfig.production.basePath || '(root)'}`);
    
  } catch (error) {
    console.error('❌ Error syncing deployment config:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  syncDeploymentConfig();
}

module.exports = syncDeploymentConfig;
