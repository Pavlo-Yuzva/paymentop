import { expect } from '@playwright/test';
import { test } from '@src/fixtures/test-fixtures';
import { generateName, generateNumber } from '@src/utils/utils';
import { isValidAge, isString } from '@src/utils/validators';

/**
 * All tests here are executed after setup file.
 * It means they will already have "token" in their header (specified in playwright.config.ts)
 * If no need in this header there are a couple of diffeent ways:
 * 1. Create another one project in playwright.config.ts
 * 2. Create test configuration with using extraHTTPHeaders: token: ''
 * 3. Determine headers { token: '' } for a specific test (for example for unauthorized tests).
 */

test.describe('/v1/users tests', () => {
  test('Should get user info', async ({ amv1 }) => {
    const response = await amv1.users.getUser(generateNumber());

    /** I wrote this expect in accordance with a test task.
     * But I do not recommend create expects such like this.
     * It is much better to assert values. This assertion will check as type as value at the same time.
     * For example if we know user with id = 1 is 'Pavlo': expect(response.json.username).toBe('Pavlo')
     * If we need to ensure types of response values, better use checking JSON Schemas validation.
     */

    expect(isString(response.json.username)).toBeTruthy();

    expect(isValidAge(response.json.age)).toBeTruthy();

    /* No type definition in test task so I check only is it defined. */
    expect(response.json.user_id).toBeDefined();
  });

  test('Should create a user', async ({ amv1 }) => {
    const username = generateName();

    const response = await amv1.users.postUser({
      username: username,
      age: generateNumber(2),
      userType: true,
    });

    expect(response.json.username).toBe(username);

    expect(response.json.user_id).toBeDefined();
  });
});
