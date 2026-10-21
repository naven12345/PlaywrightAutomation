// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  testMatch:'**/*.spec.js',
  timeout : 40*1000,
  expect:{
    timeout : 5000,
  },
  reporter : 'html',
  use: {
    actionTimeout:10*1000,
    navigationTimeout: 30*1000,
    browserName : 'chromium',
    headless : false,
    screenshot: 'on',
    trace:'on',
    viewport: null,
        launchOptions: {
            args: ['--start-maximized']
        }
  },
})

