describe("API Tests", () => {
  it("GET /status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.update_at).toBeDefined();
    const parsedUpdatedAt = new Date(body.update_at).toISOString();
    expect(body.update_at).toEqual(parsedUpdatedAt);
    expect(body.dependecies.database.version).toBe("16.1");
    expect(body.dependecies.database.max_connections).toBe("100");
    expect(
      Number(body.dependecies.database.current_connections),
    ).toBeGreaterThanOrEqual(1);
  });
});
