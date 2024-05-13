import { test, expect } from '@playwright/test';

let shouldScreenshot = false

test.beforeEach(async ({ page }) => {
  const colorScheme = process.env.COLOR_SCHEME as "light" | "dark" | undefined
  shouldScreenshot = colorScheme === "light" || colorScheme === "dark" 
  await page.emulateMedia({ colorScheme });
})

test('home page, go to projects', async ({ page }) => {

  await page.goto('http://localhost:4321');

  // Expect a title "to contain" a substring.
  await page.getByRole('link', { name: 'Projects' }).click();

  // Hover over an element
  await page.getByRole('link', { name: 'Portfolio Site Contains the' }).hover();

  expect(page.url()).toContain('projects');

  // get a screenshot
  shouldScreenshot && await page.screenshot({ path: 'project-page.png', fullPage: true })
});

