import {test} from "../test-options";
import {PageManager} from "../page-objects/pageManager";
import { faker } from "@faker-js/faker"; 

// test.beforeEach(async ({ page }) => {
//     await page.goto(process.env.URL)
// })


test(`parametrized methods`, async ({ pageManager: pm}) => {
    // const navigationPage = new NavigationPage(page);
    // const formLayoutsPage = new FormLayoutsPage(page);
    // const onDatePickerPage = new DatePickerPage(page);
    // const pm = new PageManager(page);
    const randomFullname = faker.person.fullName();
    const randomEmail = `${randomFullname.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`;
    
    
    await pm.formLayouts().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'password123', 'Option 1'); 
    await pm.formLayouts().submitInlineFormWithNameEmailAndCheckbox(randomFullname, randomEmail, true);
 
})  