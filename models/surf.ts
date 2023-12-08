async function post(
  url: string,
  initConfig: {
    token?: string;
    body: Record<string, any>;
  },
) {
  if (initConfig.token)
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "Set-Cookie": `auth=${initConfig.token}; HttpOnly; Secure; SameSite=Strict`,
      }),
      body: JSON.stringify(initConfig.body),
    });
  return fetch(url, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(initConfig.body),
  });
}
async function get(
  url: string,
  initConfig: {
    token?: string;
  },
) {
  if (initConfig.token)
    return fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Set-Cookie": `auth=${initConfig.token}; HttpOnly; Secure; SameSite=Strict`,
      }),
    });
  return fetch(url, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
}

function getAuthToken(req: Request) {
  return req.headers.getSetCookie()[0].split(";")[0].split("=")[1];
}

export default Object.freeze({
  post,
  get,
  getAuthToken,
});
