import { APIRequestContext } from "@playwright/test";
import { testsConfig } from "@src/environment";
import {
  ApiVersion,
  BodyInRequest,
  handleResponse,
} from "@api/api-manager/api-manager";

/**
 * Class describes methods for /users resource.
 * It is useful in case the same request is needed in different tests.
 * You call this method and already know which data should be sent to have a successful response.
 */

export class Users {
  readonly request: APIRequestContext;
  readonly version: ApiVersion;
  readonly resource: string;

  constructor(request: APIRequestContext, version: ApiVersion) {
    this.request = request;
    this.version = version;
    this.resource = `${testsConfig.apiUrl}${this.version}/users`;
  }

  /* Real request found during paydo.com testing.*/
  public async generateFirewallToken() {
    const response = await this.request.get(
      `${this.resource}/generate-firewall-token`
    );

    return handleResponse(response);
  }

  /* Real request found during paydo.com testing.*/
  public async login(data: {
    email: string;
    password: string;
    firewallToken: string;
  }) {
    const response = await this.request.post(`${this.resource}/login`, {
      data: {
        email: data.email,
        password: data.password,
        firewallToken: data.firewallToken,
      },
    });

    return handleResponse(response);
  }

  /* GET request specified in test task 3.1, not real */
  public async getUser(userId: number) {
    const response = await this.request.get(`${this.resource}/user/${userId}`);

    return handleResponse(response);
  }

  /**
   * Pay attention there are "data" and "body" specified as arguments in postUser method.
   * Data is required. It means request will always return status code != OK without these values.
   * Body is optional. If there is a need to send a request with additional values you can specify them here.
   */

  /* POST request specified in test task 3.2, not real */
  public async postUser(
    data: {
      username: string;
      age: number;
      userType: boolean;
    },
    body?: BodyInRequest
  ) {
    const response = await this.request.post(`${this.resource}/user`, {
      data: {
        username: data.username,
        age: data.age,
        user_type: data.userType,
        ...body,
      },
    });

    return handleResponse(response);
  }
}
