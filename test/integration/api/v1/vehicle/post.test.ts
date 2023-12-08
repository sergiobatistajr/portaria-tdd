import surf from "../../../../../models/surf";
import webserver from "../../../../../infra/webserver";
import jwt from "../../../../../models/jwt";
import { randomUUID } from "crypto";
describe("API for create Vehicle", () => {
  let token = jwt.sign({ id: randomUUID(), role: "admin" });
  beforeAll(async () => {
    //create a user
    //login a user
    //set the token
  });
  afterAll(async () => {});
  it("POST /vehicle should return 200", async () => {
    const vehicle = {
      name: "John Doe",
      entry_date: new Date(),
      plate: "FLK5E66",
      model: "Commander",
      pax: 2,
      observation: "opa",
    };
    const response = await surf.post(`${webserver.host}/api/v1/vehicle`, {
      token,
      body: vehicle,
    });
    const body = await response.json();
    console.log(body);
    expect(response.status).toEqual(200);
  });
});
