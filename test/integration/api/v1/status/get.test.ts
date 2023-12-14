import webserver from "../.../../../../../../infra/webserver";

describe("API Status Tests", () => {
  it("GET /status should return 200", async () => {
    const response = await fetch(`${webserver.host}/api/v1/status`);
    expect(response.status).toEqual(200);
    const body = await response.json();
    expect(body).toMatchObject(expectedBodySchema);
    const parsedUpdatedAt = new Date(body.updated_at).toISOString();
    expect(body.updated_at).toEqual(parsedUpdatedAt);
    expect(body.dependecies.database.version).toEqual("16.1");
    expect(body.dependecies.database.max_connections).toEqual(100);
    expect(body.dependecies.database.current_connections).toEqual(1);
  });
});
const expectedBodySchema = {
  updated_at: expect.any(String),
  dependecies: {
    database: {
      version: expect.any(String),
      max_connections: expect.any(Number),
      current_connections: expect.any(Number),
    },
  },
};
