import webserver from "../../../../../infra/webserver";
import surf from "../../../../../models/surf";

function createUser(user: any) {
  return surf.post(`${webserver.host}/api/v1/test`, { body: user });
}

async function loginUser(user: any) {
  const res = await surf.post(`${webserver.host}/api/v1/login`, { body: user });
  const token = surf.getAuthToken(res);
  return {
    status: res.status,
    token,
  };
}
function deleteUser(user: any) {
  return fetch(`${webserver.host}/api/v1/test?email=${user.email}`, {
    method: "DELETE",
  });
}

export default Object.freeze({
  createUser,
  loginUser,
  deleteUser,
});
