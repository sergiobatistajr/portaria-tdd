import webserver from "../../../../../infra/webserver";
describe("Api POST for /login endpoint", () => {
  beforeAll(async () => {});
  afterAll(async () => {});
  it("POST /vehicle should return 200", async () => {
    const vehicle = {
      name: "jhon doe",
      entry_date: new Date(),
    };
    const response = await fetch(`${webserver.host}/api/v1/vehicle`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(vehicle),
    });
    const bodyTest = await response.text();
    expect(response.status).toEqual(200);
    expect(bodyTest).toEqual("test");
  });
});
