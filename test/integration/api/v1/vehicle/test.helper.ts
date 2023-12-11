import webserver from "../../../../../infra/webserver";
import surf from "../../../../../models/surf";

function createUser() {
  const user = {
    name: "John Doe",
    role: "admin",
    email: "johndoe@teste.com",
    password: "123456789",
    confirm_password: "123456789",
  };
  return surf.post(`${webserver.host}/api/v1/test`, { body: user });
}
function loginUser() {
  const user = {
    email: "johndoe@teste.com",
    password: "123456789",
  };
  return surf.post(`${webserver.host}/api/v1/login`, { body: user });
}
function deleteUser() {
  return fetch(`${webserver.host}/api/v1/test?email=johndoe@teste.com`, {
    method: "DELETE",
  });
}
export default Object.freeze({
  createUser,
  loginUser,
  deleteUser,
});
