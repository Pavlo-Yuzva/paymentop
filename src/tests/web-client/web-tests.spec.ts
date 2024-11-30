import { test, expect } from '@playwright/test';
import { PageManager } from '@src/pages/page-manager/page-manager';
import { generateName } from '@src/utils/utils';

let pm: PageManager;

/**
 * Initializing of context gives more control than built-in contexts inside the PW fixtures.
 * I chose here beforeEach (not All) because it is a good practice to use "clear" state for every UI test.
 * It may be a bit more expensive from resources side (especially if tests are run in parallel).
 * But tests are much more stable and independent.
 */

test.beforeEach(async ({ browser }) => {
  const context = await browser.newContext();
  pm = new PageManager(await context.newPage());
});

test.afterEach(async ({ browser }) => {
  /**
   * It is preffered using here "for" cycle rather than await Promise.all[] to ensure all contexts are closed in a queue.
   * In my previous experience I faced an issue when the context from next .spec file started before context in previous file had not been closed yet.
   */

  for (const context of browser.contexts()) {
    await context.close();
  }
});

test.describe('Web-client', () => {
  test(`TEST TASK 1: Should ensure all elements are visible on registration page`, async () => {
    /** I do not use test.step() on a regular basis. Here it used only to reflect the steps of the test task.
     *  Test.step() creates nested functions and makes code reading harder.
     *  Locators or specific functions called in test should have accurate names.
     *  Accurate names help in undestanding what is going on in test-scenario without test.step() */

    await test.step('Відкрити цю сторінку https://paydo.com/', async () => {
      await pm.homePage.goto();
    });

    await test.step('Натиснути кнопку Open Account', async () => {
      await pm.homePage.locators.openAccount().click();
    });

    await test.step('Перевірити наявність всіх UI єлементів', async () => {
      /**
       * I prefer using cycle if I do a simple action in checking more than 3 UI elements.
       * Looking on a code we can't say exactly which elements are checked here without checking pm.signUpPage.locators.
       * But in my opinion this is much better than see many expect lines in one test.
       * If the test is failed - reporter will display XPATH of the failed element and it is possible to detect missing element.
       */

      for (const locator of Object.values(pm.signUpPage.locators)) {
        await expect(locator()).toBeVisible();
      }
    });
  });

  test('TEST TASK 2: Should ensure error message is appeared when user types incorrect credentials', async () => {
    await pm.loginPage.goto();

    await pm.loginPage.locators.email().fill(`${generateName()}@gmail.com`);
    await pm.loginPage.locators.password().fill(generateName());

    await pm.loginPage.locators.logIn().click();

    /**
     * This test only checks error message on UI if credentials are invalid, there is no E2E scenario.
     * In such scenarios I would use mocking server responses to fasten the flow. Mocking example is presented in test below.
     * Specifically for this scenario difference in test time is not significant, because response is "light" (~0.1s).
     */

    await expect(pm.loginPage.locators.credentialsInvalidError()).toBeVisible();
    /** Test time on my machine 5.9 sec */
  });

  test('TEST TASK 2: MOCKED EXAMPLE', async () => {
    pm.page.route(/\/login/, async (route) => {
      const responseData = {
        message: '["The email address or password you entered is incorrect"]',
        status: 0,
      };

      const mockedResponse = {
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify(responseData),
      };

      await route.fulfill(mockedResponse);
    });

    await pm.loginPage.goto();
    await pm.loginPage.locators.email().fill(`${generateName()}@gmail.com`);
    await pm.loginPage.locators.password().fill(generateName());

    await pm.loginPage.locators.logIn().click();

    await expect(pm.loginPage.locators.credentialsInvalidError()).toBeVisible();
    /** Test time on my machine 5.8 sec */
  });
});
