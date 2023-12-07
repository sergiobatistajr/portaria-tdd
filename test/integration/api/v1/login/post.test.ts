import webserver from "infra/webserver";

describe("Api POST for /login endpoint", () => {
  beforeAll(async () => {
    const user = {
      name: "John Doe",
      role: "admin",
      email: "johndoe@teste.com",
      password: "123456789",
      confirm_password: "123456789",
    };
    const response = await fetch(`${webserver.host}/api/v1/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    expect(response.status).toBe(201);
  });
  afterAll(async () => {
    const response = await fetch(
      `${webserver.host}/api/v1/test?email=johndoe@teste.com`,
      {
        method: "DELETE",
      },
    );
    const bodyText = await response.text();
    expect(response.status).toBe(200);
    expect(bodyText).toBe("Deleted");
  });
  it("POST /login should return 200", async () => {
    const loginUser = {
      email: "johndoe@teste.com",
      password: "123456789",
    };
    const response = await fetch(`${webserver.host}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    });
    expect(response.status).toBe(200);
  });
});
