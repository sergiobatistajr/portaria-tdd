import testHelper from "./test.helper";

let token: string | undefined = "";
const vehicle = {
  name: "John Doe",
  entry_date: new Date(),
  plate: "FLK5E66",
  model: "Commander",
  pax: 2,
  observation: "opa",
};
describe("API for create Vehicle", () => {
  beforeAll(async () => {
    await testHelper.deleteGuest(vehicle.plate);
    await testHelper.deleteUser();
    await testHelper.createUser();
    const resLoginUser = await testHelper.loginUser();
    expect(resLoginUser.status).toEqual(200);
    token = resLoginUser.headers.get("Set-Cookie")?.split("=")[1].split(";")[0];
  });
  afterAll(async () => {
    await testHelper.deleteGuest(vehicle.plate);
    await testHelper.deleteUser();
  });

  it("POST /vehicle should return 200", async () => {
    const res = await testHelper.createVehicle(vehicle, token!);
    console.log(await res.json());
    expect(res.status).toEqual(200);
  });
  it("POST /vehicle should return 401", async () => {
    const res = await testHelper.createVehicle(
      vehicle,
      "diahsodhashudphasphaduiahsiuhd;",
    );
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body.error.message).toEqual("jwt malformed");
  });
  it("POST /vehicle should return 401", async () => {
    const res = await testHelper.createVehicle(vehicle, token!);
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body.error.message).toEqual("Visitante já está dentro");
  });
});
