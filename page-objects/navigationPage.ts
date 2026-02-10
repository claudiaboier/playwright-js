import {Locator, Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    constructor(page: Page) {
        super(page); //“Call the constructor of the parent class.” No need for this.page assignment here. Also no field declaration needed.
    }

    async navigateToFormLayoutsPage() {
        await this.selectGroupMenuItem(`Forms`)
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2);
    }

    async navigateToDatepickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async navigateToToastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async navigateToTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async navigateToTooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }  
    
    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const isExpanded = await groupMenuItem.getAttribute('aria-expanded')
        if (isExpanded !== 'true') 
            await groupMenuItem.click();   
    }
}
