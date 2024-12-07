import { expect } from '@playwright/test';
import { test } from '@src/fixtures/test-fixtures';
import { HandleResponseResult } from '@src/api/types/types';
import { testsConfig } from '@src/environment';

/**
 * This is a setup file. Test here is based on a real API I found during testing paydo.com
 * This file is executed before all tests determined in api project (look on playwright.config.ts file)
 */

test('Login', async ({ amv1 }) => {
  const firewallToken = await amv1.users.generateFirewallToken();

  /** The reason of adding "while" cycle here is that test works much faster than server processes the firewallToken.
   * I faced an issue that I received this token but was not able to use it immediately because server was still processing it.
   * So I decided to request server for a login every 500ms until the statusCode is OK.
   */

  let success = false;
  let responseLogin = {} as HandleResponseResult;

  while (!success) {
    responseLogin = await amv1.users.login({
      email: testsConfig.testUser.email,
      password: testsConfig.testUser.password,
      firewallToken: firewallToken.json.data.firewallToken,
    });

    success = responseLogin.statusCode === 200;

    if (!success) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  const token = responseLogin.headers['token'];
  expect(token).toBeDefined();

  process.env.TESTS_BEARER = token;
});
