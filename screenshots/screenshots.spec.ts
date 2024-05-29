import { test, expect } from '@playwright/test';

const pagePaths = [
  {path: '/', name: "home"}, 
  {path: '/blog', name: "blog"}, 
  {path: '/projects', name: "projects"}, 
  {path: '/resume', name: "resume"}, 
  {path: '/projects/portfolio-site', name: 'portfolio'},
  {path: '/projects/megaresume', name: 'megaresume'},
  {path: '/projects/sweet', name: 'sweet'},
  {path: '/projects/thetwoeyesinteam', name: 'thetwoeyesinteam'},
  {path: '/projects/timeclock', name: 'timeclock'}
]

test.describe('Screenshots', async () => {
  for (const path of pagePaths) {
    test(`Screenshot ${path.path}`, async ({ page }) => {
      await page.goto(path.path);
      await expect(page).toHaveScreenshot(`${path.name}.png`, { fullPage: true })
    })
  }
})
