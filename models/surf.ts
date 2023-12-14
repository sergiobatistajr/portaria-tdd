/**
 * Realiza uma requisição HTTP POST para a URL especificada.
 *
 * @param url - A URL para a qual a requisição será enviada.
 * @param initConfig - Um objeto de configuração que pode conter um token opcional e o corpo da requisição.
 *                     O corpo da requisição é um objeto que será convertido em uma string JSON e enviado como o corpo da requisição HTTP POST.
 * @returns Uma Promise que resolve para a resposta da requisição HTTP POST.
 */
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${initConfig.token}`,
      },
      body: JSON.stringify(initConfig.body),
    });
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(initConfig.body),
  });
}
/**
 * Realiza uma requisição HTTP GET para a URL especificada.
 *
 * @param url - A URL para a qual a requisição será enviada.
 * @param initConfig - Um objeto de configuração que pode conter um token opcional.
 * @returns Uma Promise que resolve para a resposta da requisição HTTP GET.
 */
async function get(
  url: string,
  initConfig: {
    token?: string;
  },
) {
  if (initConfig.token)
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${initConfig.token}`,
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
 * Obtém o token de autenticação de uma requisição HTTP.
 *
 * @param api - A requisição HTTP ou a resposta HTTP de onde o token de autenticação será obtido.
 * @returns O token de autenticação obtido do cabeçalho "Authorization" da requisição ou resposta.
 */
function getAuthToken(api: Request | Response) {
  const token = api.headers.get("authorization");
  return token?.split(" ")[1];
}
/**
 * Cria uma nova resposta HTTP.
 *
 * @param body - O corpo da resposta, que é um objeto que será convertido em uma string JSON.
 * @param status - O código de status HTTP da resposta.
 * @param authToken - Um token de autenticação opcional. Se fornecido, um cabeçalho "Set-Cookie" será adicionado à resposta.
 * @returns Uma nova resposta HTTP com o corpo, status e cabeçalhos especificados.
 */
function response(
  body: string | Record<string, any> | undefined | null,
  status: number,
  authToken?: string,
): Response {
  if (authToken) {
    return new Response(JSON.stringify(body), {
      status: status,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
  return new Response(JSON.stringify(body), {
    status: status,
  });
}
export default Object.freeze({
  post,
  get,
  getAuthToken,
  response,
});
