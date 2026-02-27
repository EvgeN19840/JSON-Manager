import { expect, test } from "@playwright/test";

test("Test class", async ({ page }) => {


    const pageProject = await page.context().newPage()
    await pageProject.goto('https://ci-cd-json-manager.netlify.app/home')

    await expect(page).toHaveTitle(/CayPay/);


})