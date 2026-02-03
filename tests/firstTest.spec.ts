import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})


test('Locator syntax rules', async ({page}) => {
    page.locator('input[placeholder="Email"]')
    page.locator('#inputEmail')
    page.locator('[placeholder="Email"]')


})

test('User facing locators', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()
    await page.getByLabel('Email').click()
    await page.getByPlaceholder('Email').nth(1).click()

})

test('Locating child elements', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.locator('nb-card nb-radio :text-is("Option 2")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()
})

test('Locating parent elements', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByLabel('Email').click()
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({hasText: "Using the Grid"}).getByRole('textbox', { name: "Email" }).click()
})

test('Reusing the locators', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const basicForm = page.locator('nb-card', {hasText: "Basic Form"})
    await basicForm.getByRole('textbox', {name: "Email"}).fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('random123')
    await basicForm.getByRole('button').click()

})

test.describe('suite1', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Charts', { exact: true }).click()
    })
    test('the first test', async ({ page }) => {
        await page.getByText('Echarts', { exact: true }).click()
    })
})



test.describe('suite2', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })


    test('the first test from suite', async ({ page }) => {

        await page.getByText('Form Layouts').click()

    })

    test('navigate to datepicker page suite', async ({ page }) => {

        await page.getByText('Datepicker').click()

    })
})

