import { APIRequestContext, APIResponse } from '@playwright/test';
import { Users } from '@src/api/resources/users';

/**
 * Determines which api version will be used for sending the requests.
 */
export type ApiVersion = '/v1' | '/v2';

/**
 * Determines key-value types in body while sending requests.
 */

export type BodyInRequest = Record<
  string,
  string | number | object | boolean | null | undefined
>;

/**
 * Determines the possible JSON response from server.
 * It is very useful while creating api tests: you always have fast access to possible values.
 * Here added all values determined in test task + some real I found during the login testing on paydo.com.
 * If JSONS are very different between resources it is better to create this type for every resource and values won't be mixed.
 */

export type PossibleServerResponse = {
  /* Data and status here based on real response from api.paydo.com */
  data: {
    firewallToken: string;
  };

  status: number;

  /* Values determined in test tasks 3.1 and 3.2. */
  username: string;
  age: number;
  user_id: number;
};

/**
 * Determines the type of the response handler.
 */

export type HandleResponseResult = {
  json: PossibleServerResponse;
  statusCode: number;
  headers: { [key: string]: string };
};

/**
 * Response handler. It gives fast access to JSON object, status or headers.
 * Code without this handler will need many .then() for every response.
 */

export async function handleResponse(
  response: APIResponse
): Promise<HandleResponseResult> {
  let json: object;

  try {
    json = await response.json();
  } catch {
    json = {}; /*If response returns no json, for example HEAD request. */
  }

  return {
    json: json as PossibleServerResponse,
    statusCode: response.status(),
    headers: response.headers(),
  };
}

/**
 * Class should be used for calling all api resources in one place and specify the api version.
 * APIRequestContext is a built-in interface in PW.
 */

export class ApiManager {
  readonly request: APIRequestContext;
  readonly users: Users;

  constructor(request: APIRequestContext, version: ApiVersion) {
    this.request = request;
    this.users = new Users(request, version);
  }
}
