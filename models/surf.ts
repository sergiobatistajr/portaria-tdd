type Body = Record<string, any> | string;
type RequestInitGet = {
  authToken?: string;
};
type RequestInitPost = {
  body: Body;
  authToken?: string;
};
type ResponseInit = {
  status: number;
  authToken?: string;
};

/**
 * Makes a POST request to the specified URL with the given options.
 * @param url - The URL to send the request to.
 * @param init - The options for the request.
 * @returns A Promise that resolves to the response of the request.
 */
async function post(url: string, init: RequestInitPost) {
  if (init.authToken)
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${init.authToken}`,
      },
      body: JSON.stringify(init.body),
    });
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(init.body),
  });
}
/**
 * Sends a PATCH request to the specified URL with the provided options.
 * If an authToken is provided, it will be included in the request headers.
 * @param url - The URL to send the PATCH request to.
 * @param init - The options for the PATCH request.
 * @returns A Promise that resolves to the response of the PATCH request.
 */
async function patch(url: string, init: RequestInitPost) {
  if (init.authToken)
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${init.authToken}`,
      },
      body: JSON.stringify(init.body),
    });
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(init.body),
  });
}
/**
 * Makes a GET request to the specified URL.
 * @param url - The URL to make the GET request to.
 * @param init - Optional request initialization options.
 * @returns A Promise that resolves to the response of the GET request.
 */
async function get(url: string, init?: RequestInitGet) {
  if (init)
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${init.authToken}`,
      },
    });
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Retrieves the authentication token from the API request or response.
 * @param api - The API request or response object.
 * @returns The authentication token.
 */
function getAuthToken(api: Request | Response) {
  const token = api.headers.get("authorization");
  return token?.split(" ")[1];
}

/**
 * Creates a new Response object with the specified body and initialization options.
 * @param body - The body of the response.
 * @param init - The initialization options for the response.
 * @returns A new Response object.
 */
function response(body: Body | null | undefined, init: ResponseInit): Response {
  if (init.authToken) {
    return new Response(JSON.stringify(body), {
      status: init.status,
      headers: {
        Authorization: `Bearer ${init.authToken}`,
      },
    });
  }
  return new Response(JSON.stringify(body), {
    status: init.status,
  });
}
export default Object.freeze({
  post,
  get,
  patch,
  getAuthToken,
  response,
});
