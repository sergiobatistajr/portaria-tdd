import surf from "../../../../../models/surf";
import webserver from "../../../../../infra/webserver";
import testHelper from "./test.helper";
import jwt from "../../../../../models/jwt";
import { randomUUID } from "crypto";

describe("API for create Vehicle", () => {
  let token: string = "";
  beforeEach(async () => {
    const response = await testHelper.createUser();
    expect(response.status).toEqual(201);

    const loginResponse = await testHelper.loginUser();
    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.headers.getSetCookie()[0].split("=")[0]).toEqual(
      "auth",
    );
    token = loginResponse.headers.getSetCookie()[0].split("=")[1];
  });
  afterEach(async () => {
    const response = await testHelper.deleteUser();
    const bodyText = await response.text();
    expect(response.status).toEqual(200);
    expect(bodyText).toEqual("Deleted");
  });

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
    expect(response.status).toEqual(200);
  });
  it("POST /vehicle should return unauthorized", async () => {
    const vehicle = {
      name: "John Doe",
      entry_date: new Date(),
      plate: "FLK5E66",
      model: "Commander",
      pax: 2,
      observation: "opa",
    };
    const response = await surf.post(`${webserver.host}/api/v1/vehicle`, {
      body: vehicle,
    });
    expect(response.status).toEqual(401);
  });
  it("POST /vehicle should return unauthorized with falsy token", async () => {
    let id = randomUUID();
    let role = "admin";
    const fToken = jwt.sign({ id, role });
    const vehicle = {
      name: "John Doe",
      entry_date: new Date(),
      plate: "FLK5E66",
      model: "Commander",
      pax: 2,
      observation: "opa",
    };
    const response = await surf.post(`${webserver.host}/api/v1/vehicle`, {
      token: fToken,
      body: vehicle,
    });
    expect(response.status).toEqual(401);
  });
});
