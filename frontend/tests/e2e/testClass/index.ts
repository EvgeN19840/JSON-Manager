import { test } from "@playwright/test";

test("Test class", async ({ page }) => {


    const pageProject = await page.context().newPage()
    await pageProject.goto('www.google.com')

})