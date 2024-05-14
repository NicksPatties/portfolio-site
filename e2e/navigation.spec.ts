import { test, expect } from '@playwright/test';

test.describe('Navigation', async () => {
  test("Going to blog page", async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Blog' }).click();
    expect(page.url()).toContain('/blog');
  })

  test("Going to project page", async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Projects' }).click();
    expect(page.url()).toContain('/projects');
  })

  test("Going to resume page", async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Résumé' }).click();
    expect(page.url()).toContain('/resume');
  })

  test("Going to home page", async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('link', { name: "NicksPatties home page"}).click()
    expect(page.url()).toBe('http://127.0.0.1:4322/')
  })
})
