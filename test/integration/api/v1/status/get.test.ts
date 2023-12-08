import webserver from "../.../../../../../../infra/webserver";

describe("API Tests", () => {
  it("GET /status should return 200", async () => {
    const response = await fetch(`${webserver.host}/api/v1/status`);
    expect(response.status).toEqual(200);
    const body = await response.json();
    expect(body.updated_at).toBeDefined();
    const parsedUpdatedAt = new Date(body.updated_at).toISOString();
    expect(body.updated_at).toEqual(parsedUpdatedAt);
    expect(body.dependecies.database.version).toEqual("16.1");
    expect(body.dependecies.database.max_connections).toEqual("100");
    expect(
      Number(body.dependecies.database.current_connections),
    ).toBeGreaterThanOrEqual(1);
  });
});
