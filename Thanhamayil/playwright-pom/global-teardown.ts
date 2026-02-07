import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting Playwright test cleanup...');
  
  // Clean up any temporary files or resources
  const fs = require('fs');
  const path = require('path');
  
  // Optional: Clean up old screenshots (keep only last 10)
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (fs.existsSync(screenshotsDir)) {
    const files = fs.readdirSync(screenshotsDir)
      .filter((file: string) => file.endsWith('.png'))
      .map((file: string) => ({
        name: file,
        time: fs.statSync(path.join(screenshotsDir, file)).mtime
      }))
      .sort((a: any, b: any) => b.time - a.time);
    
    // Keep only the 10 most recent screenshots
    if (files.length > 10) {
      const filesToDelete = files.slice(10);
      filesToDelete.forEach((file: any) => {
        fs.unlinkSync(path.join(screenshotsDir, file.name));
      });
      console.log(`🗑️  Cleaned up ${filesToDelete.length} old screenshots`);
    }
  }
  
  console.log('✅ Playwright test cleanup completed');
}

export default globalTeardown;
