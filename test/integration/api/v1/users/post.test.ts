describe("Api POST user test", () => {
  beforeAll(async () => {
    const response = await fetch(`http://localhost:3000/api/v1/test`, {
      method: "DELETE",
    });
    const bodyText = await response.text();
    expect(response.status).toBe(200);
    expect(bodyText).toBe("Deleted");
  });
  it("POST /users should return 201", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      confirm_password: "12345678",
      role: "admin",
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
    expect(body.id).toBeDefined();
  });
  it("POST /user with an existing email should return 401", async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
      confirm_password: "12345678",
      role: "admin",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe("Email is already taken");
  });
  it("POST /user with all fields undefined should return 401", async () => {
    const user = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe(
      "Name is required, Last name is required, Email is invalid, Password is weak, Confirm password is weak, Invalid enum value. Expected 'admin' | 'user' | 'report', received ''",
    );
  });
  it("POST /user with small name should return 401", async () => {
    const user = {
      name: "jo",
      email: "johndoe@example.com",
      password: "12345678",
      confirm_password: "12345678",
      role: "admin",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe("Name is required, Last name is required");
  });
  it("POST /user without last name should return 401", async () => {
    const user = {
      name: "john",
      email: "johndoe@example.com",
      password: "12345678",
      confirm_password: "12345678",
      role: "admin",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe("Last name is required");
  });
  it("POST /user with weak password should return 401", async () => {
    const user = {
      name: "john doe",
      email: "johndoe@example.com",
      password: "1234",
      confirm_password: "1234",
      role: "admin",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe(
      "Password is weak, Confirm password is weak",
    );
  });
  it("POST /user with invalid email should return 401", async () => {
    const user = {
      name: "john doe",
      email: "johndoe.com",
      password: "12345678",
      confirm_password: "12345678",
      role: "admin",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe("Email is invalid");
  });
  it("POST /user with diff password and confirm_password should return 401", async () => {
    const user = {
      name: "john doe",
      email: "johndoe@example.com",
      password: "1234213231678",
      confirm_password: "12345678",
      role: "admin",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe("Passwords do not match");
  });
  it("POST /user with invalid role return 401", async () => {
    const user = {
      name: "john doe",
      email: "johndoe@example.com",
      password: "12345678",
      confirm_password: "12345678",
      role: "dasds",
    };
    const response = await fetch(`http://localhost:3000/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.error.message).toBe(
      "Invalid enum value. Expected 'admin' | 'user' | 'report', received 'dasds'",
    );
  });
});
