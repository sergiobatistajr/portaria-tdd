import surf from "../../../../../models/surf";
import webserver from "../../../../../infra/webserver";
import listallTestHelper from "./listall.test.helper";
const guest = {
  name: `John Doe Listall ${Math.random()}`,
  entry_date: new Date(),
  observation: "Lista all",
};
const vehicle = {
  name: `John Doe Listall vehicle ${Math.random()}`,
  entry_date: new Date(),
  plate: "FLK5E66",
  model: "Commander",
  pax: 2,
  observation: "opa",
};

describe("Test", () => {
  let token = "";
  beforeAll(async () => {
    await listallTestHelper.createUser();
    const res = await listallTestHelper.loginUser();
    token = res.headers.get("Set-Cookie")?.split("=")[1].split(";")[0]!;
    await Promise.all([
      listallTestHelper.createGuest(guest, token),
      listallTestHelper.createVehicle(vehicle, token),
    ]);
  });
  afterAll(async () => {
    await Promise.all([
      listallTestHelper.deleteGuest(guest.name),
      listallTestHelper.deleteVehicle(vehicle.plate),
      listallTestHelper.deleteUser(),
    ]);
  });
  it("lista all", async () => {
    const res = await surf.get(`${webserver.host}/api/v1/listall`, {});
    const text = await res.text();

    console.log(text);
  });
});
