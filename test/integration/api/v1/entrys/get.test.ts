import surf from "../../../../../models/surf";
import date from "../../../../../models/date";
import webserver from "../../../../../infra/webserver";
import entrysTestHelper from "./entrys.test.helper";
const URL = `${webserver.host}/api/v1/entrys`;
const expectedJSONKeys = ["guests", "total_pages"];
const expectedJSONGuestKeys = [
  "id",
  "name",
  "entry_date",
  "plate",
  "model",
  "status",
];
describe("Test", () => {
  let token: string | undefined = "";
  beforeAll(async () => {
    await entrysTestHelper.createUser();
    const res = await entrysTestHelper.loginUser();
    expect(res.status).toEqual(200);
    token = res.token;
    const createGuestsAndVehicles = [];
    for (let i = 10; i < 60; i++) {
      const guest = {
        name: `John Doe entrys ${i}`,
        entry_date: new Date(),
        observation: "Lista all",
      };
      const vehicle = {
        name: `John Doe entrys vehicle ${i}`,
        entry_date: new Date(),
        plate: `FLK5E${i}`,
        model: "Commander",
        pax: 2,
        observation: "opa",
      };
      createGuestsAndVehicles.push(entrysTestHelper.createGuest(guest, token!));
      createGuestsAndVehicles.push(
        entrysTestHelper.createVehicle(vehicle, token!),
      );
    }
    await Promise.all(createGuestsAndVehicles);
  });

  afterAll(async () => {
    const deleteGuestsAndVehicles = [];
    for (let i = 10; i < 60; i++) {
      deleteGuestsAndVehicles.push(
        entrysTestHelper.deleteGuest(`John Doe entrys ${i}`),
      );
      deleteGuestsAndVehicles.push(entrysTestHelper.deleteVehicle(`FLK5E${i}`));
    }
    await Promise.all(deleteGuestsAndVehicles);
    await entrysTestHelper.deleteUser();
  });

  it("GET /entrys should return 10 guests and status 200", async () => {
    const res = await surf.get(URL, {
      authToken: token,
    });
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
    body.guests.map((guest: any) => expect(guest.status).toEqual("inside"));
  });
  it("GET /entrys with invalid name should return status 200 and [] no guests", async () => {
    const name = "duaiudhaisuhduhisa";
    const queryURL = `${URL}?query=${name}`;
    const res = await surf.get(queryURL, {
      authToken: token,
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.guests).toEqual([]);
    expect(body.total_pages).toEqual(0);
  });
  it("GET /entrys with name should return status 200 and one guest", async () => {
    const name = "John Doe entrys 10";
    const queryURL = `${URL}?query=${name}`;
    const res = await surf.get(queryURL, {
      authToken: token,
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.guests.map((guest: any) =>
      expect(Object.keys(guest).sort()).toEqual(expectedJSONGuestKeys.sort()),
    );
    expect(body.total_pages).toEqual(1);
    body.guests.map((guest: any) => expect(guest.status).toEqual("inside"));
  });
  it("GET /entrys with plate should return status 200 and one vehicle", async () => {
    const plate = "FLK5E10";
    const queryURL = `${URL}?query=${plate}`;
    const res = await surf.get(queryURL, {
      authToken: token,
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.guests.map((guest: any) =>
      expect(Object.keys(guest).sort()).toEqual(expectedJSONGuestKeys.sort()),
    );
    expect(body.guests[0].plate).toEqual(plate);
    expect(body.total_pages).toEqual(1);
    body.guests.map((guest: any) => expect(guest.status).toEqual("inside"));
  });
  it("GET /entrys with date should return status 200 and 10 guest", async () => {
    const today = new Date().toLocaleDateString();
    const queryURL = `${URL}?query=${today}`;
    const res = await surf.get(queryURL, {
      authToken: token,
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.guests.map((guest: any) =>
      expect(Object.keys(guest).sort()).toEqual(expectedJSONGuestKeys.sort()),
    );
    expect(body.total_pages).toEqual(10);
    body.guests.map((guest: any) => expect(guest.status).toEqual("inside"));
  });
  it("GET /entrys with date and hour should return status 200 and 10 guest", async () => {
    const today = new Date().toISOString();
    const todayFormatted = date.formatDateToLocal(today);
    const queryURL = `${URL}?query=${todayFormatted}`;
    const res = await surf.get(queryURL, {
      authToken: token,
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.guests.map((guest: any) =>
      expect(Object.keys(guest).sort()).toEqual(expectedJSONGuestKeys.sort()),
    );
    expect(body.total_pages).toEqual(10);
    body.guests.map((guest: any) => expect(guest.status).toEqual("inside"));
  });
});
