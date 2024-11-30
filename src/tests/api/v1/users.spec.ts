import { test, expect } from '@playwright/test';
import { ApiManager } from '@src/api/api-manager/api-manager';
import { generateName, generateNumber } from '@src/utils/utils';
import { isValidAge, isString } from '@src/utils/validators';

let am: ApiManager;

/**
 * Initializing of context gives more control than built-in contexts inside the PW fixtures.
 * I chose here beforeAll (not Each) because HTTP requests are independent of each other.
 * It will save resources on execution.
 */

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  am = new ApiManager(context.request, '/v1');
});

test.afterAll(async ({ browser }) => {
  /**
   * It is preffered using here "for" cycle rather than await Promise.all() to ensure all contexts are closed in a queue.
   * In my previous experience I faced an issue when the context from next .spec file started before context in previous file had not been closed yet.
   */

  for (const context of browser.contexts()) {
    await context.close();
  }
});

/**
 * All tests here are executed after setup file.
 * It means they will already have "token" in their header (specified in playwright.config.ts)
 * If no need in this header there are a couple of diffeent ways:
 * 1. Create another one project in playwright.config.ts
 * 2. Create test configuration with using extraHTTPHeaders: token: ''
 * 3. Determine headers { token: '' } for a specific test (for example for unauthorized tests).
 */

test.describe('/v1/users tests', () => {
  test('Should get user info', async () => {
    const response = await am.users.getUser(generateNumber());

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

  test('Should create a user', async () => {
    const username = generateName();

    const response = await am.users.postUser({
      username: username,
      age: generateNumber(2),
      userType: true,
    });

    expect(response.json.username).toBe(username);

    expect(response.json.user_id).toBeDefined();
  });
});
