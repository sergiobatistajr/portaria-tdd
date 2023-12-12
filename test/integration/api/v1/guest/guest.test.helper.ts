import webserver from "../../../../../infra/webserver";
import surf from "../../../../../models/surf";

const user = {
  name: "John Doe",
  role: "admin",
  email: "johndoe@guest.com",
  password: "123456789",
  confirm_password: "123456789",
};
function createUser() {
  return surf.post(`${webserver.host}/api/v1/test`, { body: user });
}
function loginUser() {
  const user = {
    email: "johndoe@guest.com",
    password: "123456789",
  };
  return surf.post(`${webserver.host}/api/v1/login`, { body: user });
}
function deleteUser() {
  return fetch(`${webserver.host}/api/v1/test?email=${user.email}`, {
    method: "DELETE",
  });
}
function deleteGuest(name: string = "") {
  return fetch(`${webserver.host}/api/v1/guest?name=${name}`, {
    method: "DELETE",
  });
}
function createGuest(guest: any, token: string) {
  return surf.post(`${webserver.host}/api/v1/guest`, {
    body: guest,
    token,
  });
}
export default Object.freeze({
  createGuest,
  createUser,
  loginUser,
  deleteUser,
  deleteGuest,
});
