import {test, expect} from "@playwright/test";
import {PageManager} from "../page-objects/pageManager";
import { faker } from "@faker-js/faker"; 

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.URL)
})

test(`navigate to form page`, async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToFormLayoutsPage();
    await pm.navigateTo().navigateToDatepickerPage();
    await pm.navigateTo().navigateToToastrPage();
    await pm.navigateTo().navigateToTablePage();
    await pm.navigateTo().navigateToTooltipPage();   
})

test(`parametrized methods`, async ({page}) => {
    // const navigationPage = new NavigationPage(page);
    // const formLayoutsPage = new FormLayoutsPage(page);
    // const onDatePickerPage = new DatePickerPage(page);
    const pm = new PageManager(page);
    const randomFullname = faker.person.fullName();
    const randomEmail = `${randomFullname.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`;
    
    await pm.navigateTo().navigateToFormLayoutsPage();
    await pm.formLayouts().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'password123', 'Option 1'); 
    await pm.formLayouts().submitInlineFormWithNameEmailAndCheckbox(randomFullname, randomEmail, true);
    await page.screenshot({ path: `screenshots/fotmLayputsPage.png` });
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: `screenshots/inlineForm.png` });
    const buffer = await page.screenshot();
    console.log(buffer.toString('base64' ));
    // await pm.navigateTo().navigateToDatepickerPage();
    // await pm.datePicker().selectCommonDatePickerDateFromToday(30);
    // await pm.datePicker().selectDatepickerWithRangeFromToday(10, 20);
})

test.only(`navigate to form page CI`, async ({page}) => {
    const pm = new PageManager(page);
    await pm.navigateTo().navigateToFormLayoutsPage();
    await pm.navigateTo().navigateToDatepickerPage();
    await pm.navigateTo().navigateToToastrPage();
    await pm.navigateTo().navigateToTablePage();
    await pm.navigateTo().navigateToTooltipPage();   
})
