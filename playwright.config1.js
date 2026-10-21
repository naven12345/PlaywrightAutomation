// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
    testDir: './tests',
    retries :1,
    workers :3,
    timeout: 40 * 1000,
    expect: {
        timeout: 5000,
    },
    reporter: 'html',
    projects: [
        {
            name: 'safari',
            use: {
                actionTimeout: 10 * 1000,
                navigationTimeout: 30 * 1000,
                browserName: 'webkit',
                headless: false,
                screenshot: 'on',
                trace: 'on',
                video:'retain-on-failure',
                ...devices['iPhone 15 Pro']
            }
        },
        {
            name : 'chrome',
            use: {
                actionTimeout: 10 * 1000,
                navigationTimeout: 30 * 1000,
                browserName: 'chromium',
                headless: false,
                screenshot: 'on',
                trace: 'on',
                ignoreHTTPSErrors:true,
                permissions:['geolocation'],
                viewport: null,
                launchOptions: {
                    args: ['--start-maximized']
                }
            }
        }
    ]
})

