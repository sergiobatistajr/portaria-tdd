describe("Api POST user test", () => {
  it("POST /users should return 201", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      role: "admin",
      status: "active",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    console.log(body);
    expect(response.status).toBe(201);
    expect(body.email).toEqual(user.email);
    expect(body.name).toEqual(user.name);
    expect(body.role).toEqual(user.role);
    expect(body.status).toEqual(user.status);
  });
});
