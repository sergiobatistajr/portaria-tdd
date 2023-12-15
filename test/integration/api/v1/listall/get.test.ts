import surf from "../../../../../models/surf";
import webserver from "../../../../../infra/webserver";
import listallTestHelper from "./listall.test.helper";
const URL = `${webserver.host}/api/v1/listall`;
const expectedJSONKeys = ["guests", "total_pages"];
const expectedJSONGuestKeys = ["id", "name", "entry_date", "plate", "model"];
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

  it("GET /listall should return 10 guests and status 200", async () => {
    const res = await surf.get(URL);
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.guests.length).toEqual(10);
    expect(body.total_pages).toEqual(10);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.guests.map((guest: any) => {
      return expect(Object.keys(guest).sort()).toEqual(
        expectedJSONGuestKeys.sort(),
      );
    });
  });
  it("GET /listall with invalid name should return status 200 and [] no guests", async () => {
    const name = "duaiudhaisuhduhisa";
    const queryURL = `${URL}?query=${name}`;
    const res = await surf.get(queryURL);
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.guests).toEqual([]);
    expect(body.total_pages).toEqual(0);
  });
  it("GET /listall with name should return status 200 and one guest", async () => {
    const name = "John Doe Listall 10";
    const queryURL = `${URL}?query=${name}`;
    const res = await surf.get(queryURL);
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.guests.map((guest: any) =>
      expect(Object.keys(guest).sort()).toEqual(expectedJSONGuestKeys.sort()),
    );
    expect(body.total_pages).toEqual(1);
  });
  it("GET /listall with plate should return status 200 and one vehicle", async () => {
    const plate = "FLK5E10";
    const queryURL = `${URL}?query=${plate}`;
    const res = await surf.get(queryURL);
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.guests.map((guest: any) =>
      expect(Object.keys(guest).sort()).toEqual(expectedJSONGuestKeys.sort()),
    );
    expect(body.guests[0].plate).toEqual(plate);
  });
  // it("GET /listall with date should return status 200 and 10 guest", async () => {
  //   const date = "2023-12";
  //   const queryURL = `${URL}?query=${date}`;
  //   const res = await surf.get(queryURL);
  //   const body = await res.json();
  //   expect(res.status).toEqual(200);
  //   body.map((item: any) =>
  //     expect(Object.keys(item).sort()).toEqual(expectedJSONKeys.sort()),
  //   );
  //   expect(body.length).toEqual(10);
  //   // expect(body[0].plate).toEqual(plate);
  // });
});
