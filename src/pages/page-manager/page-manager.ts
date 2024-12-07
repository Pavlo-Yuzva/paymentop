import { Page } from '@playwright/test';
import { HomePage } from '@pages/home';
import { SignUpPage } from '@pages/signup';
import { LoginPage } from '@pages/login';

/**
 * Class should be used for calling all pages in one place.
 * Page is a built-in interface in PW.
 */

export class PageManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly signUpPage: SignUpPage;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.signUpPage = new SignUpPage(this.page);
    this.loginPage = new LoginPage(this.page);
  }
}
