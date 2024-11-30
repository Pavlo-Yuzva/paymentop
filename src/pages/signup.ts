import { Page } from '@playwright/test';
import { testsConfig } from '@src/environment';

export class SignUpPage {
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

    backToHomepage: () =>
      this.page.locator(
        '//auth-sign-up//auth-header//a[contains(@href, "paydo")]'
      ),
    logIn: () =>
      this.page.locator(
        '//auth-sign-up//auth-header//a[contains(@href, "sign-in")]'
      ),
    authTitle: () =>
      this.page.locator(
        '//auth-sign-up//div[contains(@class, "auth-container")]//auth-title'
      ),
    email: () => this.page.locator('//auth-sign-up//input[@id="mat-input-0"]'),
    password: () =>
      this.page.locator('//auth-sign-up//input[@id="mat-input-1"]'),
    confirmPassword: () =>
      this.page.locator('//auth-sign-up//input[@id="mat-input-2"]'),
    createAccount: () => this.page.locator('//auth-sign-up//button'),
    switchToBusinessAccount: () =>
      this.page.locator('//auth-sign-up//a[contains(@href, "sign-up")]'),
    termsOfUse: () =>
      this.page.locator('//auth-footer//a[contains(@href, "terms-of-use")]'),
  };

  public async goto() {
    await this.page.goto(`${testsConfig.baseUrl}/en/auth/personal/sign-up`);
  }
}
