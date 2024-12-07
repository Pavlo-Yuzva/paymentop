import { APIResponse } from '@playwright/test';
import { HandleResponseResult, PossibleServerResponse } from '@api/types/types';

/**
 * Handles response received. It gives fast access to JSON, status or headers.
 * Code without this handler will need .then() every time I need these objects.
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
