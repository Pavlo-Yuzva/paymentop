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
