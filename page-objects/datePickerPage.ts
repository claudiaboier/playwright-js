import { expect, Page } from "@playwright/test";

export class DatePickerPage {

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(firstDayOffset: number, secondDayOffset: number) {
        const dateRangeInputField = this.page.getByPlaceholder('Range Picker')
        await dateRangeInputField.click()
        const firstDateToAssert = await this.selectDateInTheCalendar(firstDayOffset)
        const secondDateToAssert = await this.selectDateInTheCalendar(secondDayOffset)
        const dateRangeToAssert = `${firstDateToAssert} - ${secondDateToAssert}`    
        await expect(dateRangeInputField).toHaveValue(dateRangeToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.toLocaleString('default', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('default', { month: 'long' })
        const expectedYear = date.getFullYear().toString()
        const dateToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`

        let calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while (calendarMonthYear?.trim() != expectedMonthAndYear) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return dateToAssert;
    }
}