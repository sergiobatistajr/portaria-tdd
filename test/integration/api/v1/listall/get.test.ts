import surf from "../../../../../models/surf";
import webserver from "../../../../../infra/webserver";
import listallTestHelper from "./listall.test.helper";

describe("Test", () => {
  let token: string | undefined = "";
  beforeAll(async () => {
    await listallTestHelper.createUser();
    const res = await listallTestHelper.loginUser();
    expect(res.status).toEqual(200);
    token = res.token;
    const createGuestsAndVehicles = [];
    for (let i = 10; i < 60; i++) {
      const guest = {
        name: `John Doe Listall ${i}`,
        entry_date: new Date(),
        observation: "Lista all",
      };
      const vehicle = {
        name: `John Doe Listall vehicle ${i}`,
        entry_date: new Date(),
        plate: `FLK5E${i}`,
        model: "Commander",
        pax: 2,
        observation: "opa",
      };
      createGuestsAndVehicles.push(
        listallTestHelper.createGuest(guest, token!),
      );
      createGuestsAndVehicles.push(
        listallTestHelper.createVehicle(vehicle, token!),
      );
    }
    await Promise.all(createGuestsAndVehicles);
  });

  afterAll(async () => {
    const deleteGuestsAndVehicles = [];
    for (let i = 10; i < 60; i++) {
      deleteGuestsAndVehicles.push(
        listallTestHelper.deleteGuest(`John Doe Listall ${i}`),
      );
      deleteGuestsAndVehicles.push(
        listallTestHelper.deleteVehicle(`FLK5E${i}`),
      );
    }
    await Promise.all(deleteGuestsAndVehicles);
    await listallTestHelper.deleteUser();
  });

  it("lista all", async () => {
    const res = await surf.get(`${webserver.host}/api/v1/listall`, {});
    const body = await res.json();
    console.log(body);
    expect(body.length).toEqual(10);
  });
});
