import { Page } from '@playwright/test';
import { testsConfig } from '@src/environment';

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public locators = {
    /**
     * It would be much easier to take locators using text()="" inside.
     * I haven't used this method due to localization reason.
     * Text or placeholders will be changed in other localization and locators won't work in this case.
     * If there is no aim to test localization using automation in a future it is great to use text()="" to simplify their reading.
     */

    email: () => this.page.locator('//auth-sign-in//input[@id="mat-input-0"]'),
    password: () =>
      this.page.locator('//auth-sign-in//input[@id="mat-input-1"]'),
    logIn: () => this.page.locator('//auth-sign-in//button'),
    credentialsInvalidError: () =>
      this.page.locator(
        '//auth-sign-in//ngp-info-block[contains(@class, "error")]'
      ),
  };

  public async goto() {
    await this.page.goto(`${testsConfig.accountsUrl}/en/auth/personal/sign-in`);
  }
}
