import { test as base } from '@playwright/test';
import { PageManager } from '@pages/page-manager/page-manager';
import { ApiManager } from '@src/api/api-manager/api-manager';

/**
 * Haven't moved this to types file as it will be used once and only here.
 */

type Fixtures = {
  pm: PageManager;
  amv1: ApiManager;
  amv2: ApiManager;
};

export const test = base.extend<Fixtures>({
  /** For fast access to all pages */
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },

  /** For API testing using only v1 */
  amv1: async ({ page }, use) => {
    const amv1 = new ApiManager(page, '/v1');
    await use(amv1);
  },

  /** For API testing using only v2 */
  amv2: async ({ page }, use) => {
    const amv2 = new ApiManager(page, '/v2');
    await use(amv2);
  },
});
