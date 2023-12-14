import surf from "../../../../../models/surf";
import vehicleTestHelper from "./vehicle.test.helper";

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
    await vehicleTestHelper.deleteGuest(vehicle.plate);
    await vehicleTestHelper.deleteUser();
    await vehicleTestHelper.createUser();
    const resLoginUser = await vehicleTestHelper.loginUser();
    expect(resLoginUser.status).toEqual(200);
    token = resLoginUser.token;
  });
  afterAll(async () => {
    await vehicleTestHelper.deleteGuest(vehicle.plate);
    await vehicleTestHelper.deleteUser();
  });

  it("POST /vehicle should return 200", async () => {
    const res = await vehicleTestHelper.createVehicle(vehicle, token!);
    console.log(await res.json());
    expect(res.status).toEqual(200);
  });
  it("POST /vehicle should return 401", async () => {
    const res = await vehicleTestHelper.createVehicle(
      vehicle,
      "diahsodhashudphasphaduiahsiuhd;",
    );
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body.error.message).toEqual("jwt malformed");
  });
  it("POST /vehicle should return 401", async () => {
    const res = await vehicleTestHelper.createVehicle(vehicle, token!);
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body.error.message).toEqual("Visitante já está dentro");
  });
});
