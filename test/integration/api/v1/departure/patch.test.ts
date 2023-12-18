import surf from "../../../../../models/surf";
import webserver from "../../../../../infra/webserver";
import entrysTestHelper from "./departure.test.helper";

const URL = `${webserver.host}/api/v1/departure`;
const departureDate = new Date();
describe("Test", () => {
  let token: string | undefined = "";
  let vehicle: {
    id: string;
  } = {
    id: "",
  };
  let guest: { id: string } = {
    id: "",
  };
  beforeAll(async () => {
    await entrysTestHelper.createUser();
    const res = await entrysTestHelper.loginUser();
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
      createGuestsAndVehicles.push(entrysTestHelper.createGuest(guest, token!));
      createGuestsAndVehicles.push(
        entrysTestHelper.createVehicle(vehicle, token!),
      );
    }
    await Promise.all(createGuestsAndVehicles);
    guest = await entrysTestHelper.getGuest("John Doe Listall 10", token!);
    vehicle = await entrysTestHelper.getVehicle("FLK5E10", token!);
  });

  afterAll(async () => {
    const deleteGuestsAndVehicles = [];
    for (let i = 10; i < 60; i++) {
      deleteGuestsAndVehicles.push(
        entrysTestHelper.deleteGuest(`John Doe Listall ${i}`),
      );
      deleteGuestsAndVehicles.push(entrysTestHelper.deleteVehicle(`FLK5E${i}`));
    }
    await Promise.all(deleteGuestsAndVehicles);
    await entrysTestHelper.deleteUser();
  });

  it("PATCH /departure/[id] should return status 200", async () => {
    const url = `${URL}/${vehicle.id}`;
    departureDate.setDate(departureDate.getDate() + 1);
    const res = await surf.patch(url, {
      body: {
        departure_date: departureDate,
      },
      authToken: token,
    });
    expect(res.status).toEqual(200);
  });
  it("PATCH /departure/[id] should return status 401", async () => {
    const url = `${URL}/${vehicle.id}`;
    departureDate.setDate(departureDate.getDate() - 1);
    const res = await surf.patch(url, {
      body: {
        departure_date: departureDate,
      },
      authToken: token,
    });
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body.error.message).toEqual(
      "Data de saída deve ser maior que a data de entrada.",
    );
  });
  it("PATCH /departure/[id] should return status 401", async () => {
    const url = `${URL}/${vehicle.id}`;
    departureDate.setDate(departureDate.getDate() + 1);
    const res = await surf.patch(url, {
      body: {
        departure_date: departureDate,
      },
      authToken: "auysgduiyasgdiugasuyigduysagduygsa",
    });
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body).toBeDefined();
    expect(body.error.message).toEqual("jwt malformed");
  });
  it("PATCH /departure/[id] should return status 401", async () => {
    const url = `${URL}/${vehicle.id}`;
    departureDate.setDate(departureDate.getDate() + 1);
    const res = await surf.patch(url, {
      body: {
        departure_date: departureDate,
      },
      authToken: "",
    });
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body).toBeDefined();
    expect(body).toEqual("Não autorizado");
  });
});
