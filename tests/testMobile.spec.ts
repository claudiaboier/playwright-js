import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('/')
})
test('smart table', async ({ page }, testInfo) => {
    if(testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    
    if(testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})