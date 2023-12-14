import webserver from "../.../../../../../../infra/webserver";

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
    expect(response.status).toEqual(201);
  });
  afterAll(async () => {
    const response = await fetch(
      `${webserver.host}/api/v1/test?email=johndoe@teste.com`,
      {
        method: "DELETE",
      },
    );
    const bodyText = await response.text();
    expect(response.status).toEqual(200);
    expect(bodyText).toEqual("Deleted");
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

    expect(response.status).toEqual(200);
    const isToken = response.headers.get("authorization")?.split(" ")[0];
    expect(isToken).toEqual("Bearer");
  });
});
