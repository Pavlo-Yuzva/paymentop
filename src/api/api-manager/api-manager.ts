import { APIRequestContext, Page } from '@playwright/test';
import { Users } from '@src/api/resources/users';
import { ApiVersion } from '@api/types/types';

/**
 * Class should be used for calling all api resources in one place and specify the api version.
 * APIRequestContext is a built-in interface in PW.
 */

export class ApiManager {
  /**
   * Page (not directly APIRequestContext which is an argument for initializing Users) is here because we will have a possibility to change the context using page.context() if needed.
   * In my experience I faced some flows when I need to change the context.
   */

  readonly page: Page;
  readonly request: APIRequestContext;
  readonly users: Users;

  constructor(page: Page, version: ApiVersion) {
    this.page = page;
    this.request = this.page.request;
    this.users = new Users(this.request, version);
  }
}
