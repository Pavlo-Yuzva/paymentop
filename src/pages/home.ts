import { Page } from '@playwright/test';
import { testsConfig } from '@src/environment';

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public locators = {
    openAccount: () =>
      this.page.locator(
        '//div[contains(@class, "primary-banner-section__actions")]//a[contains(@href, "sign-up")]'
      ),
    viewPricing: () =>
      this.page.locator(
        '//div[contains(@class, "primary-banner-section__actions")]//a[contains(@href, "pricing")]'
      ),
  };

  public async goto() {
    await this.page.goto(testsConfig.baseUrl);
  }
}
