import webserver from "../../../../../infra/webserver";
import surf from "../../../../../models/surf";

const user = {
  name: "John Doe",
  role: "admin",
  email: "johndoe@listvehicle.com",
  password: "123456789",
  confirm_password: "123456789",
};

function createUser() {
  return surf.post(`${webserver.host}/api/v1/test`, { body: user });
}

async function loginUser() {
  const user = {
    email: "johndoe@listvehicle.com",
    password: "123456789",
  };
  const res = await surf.post(`${webserver.host}/api/v1/login`, { body: user });
  const token = surf.getAuthToken(res);
  return {
    status: res.status,
    token,
  };
}
function deleteUser() {
  return fetch(`${webserver.host}/api/v1/test?email=${user.email}`, {
    method: "DELETE",
  });
}

function deleteVehicle(plate: string = "") {
  return fetch(`${webserver.host}/api/v1/vehicle?plate=${plate}`, {
    method: "DELETE",
  });
}

function createVehicle(vehicle: any, token: string) {
  return surf.post(`${webserver.host}/api/v1/vehicle`, {
    body: vehicle,
    authToken: token,
  });
}

function createGuest(guest: any, token: string) {
  return surf.post(`${webserver.host}/api/v1/guest`, {
    body: guest,
    authToken: token,
  });
}

function deleteGuest(name: string = "") {
  return fetch(`${webserver.host}/api/v1/guest?name=${name}`, {
    method: "DELETE",
  });
}
async function getGuest(guestName: string, authToken: string) {
  const res = await surf.get(
    `${webserver.host}/api/v1/entrys?query=${guestName}`,
    {
      authToken,
    },
  );
  const body = await res.json();
  return {
    id: body.guests[0].id,
  };
}
async function getVehicle(vhiclePlate: string, authToken: string) {
  const res = await surf.get(
    `${webserver.host}/api/v1/entrys?query=${vhiclePlate}`,
    {
      authToken,
    },
  );
  const body = await res.json();
  return {
    id: body.guests[0].id,
  };
}
export default Object.freeze({
  createVehicle,
  getGuest,
  getVehicle,
  createUser,
  createGuest,
  loginUser,
  deleteUser,
  deleteVehicle,
  deleteGuest,
});
