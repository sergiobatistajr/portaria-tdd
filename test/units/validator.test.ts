import validator from "../../models/validator";

describe("Validator Tests", () => {
  it("should return valid input fields", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "active",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "admin",
    };

    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(true);
    if (result.success) expect(result.data).toEqual(inputFields);
  });

  it("should return an error when passwords do not match", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "active",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      confirmPassword: "differentpassword",
      role: "user",
    };

    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual("Passwords do not match");
  });

  it("should return an error when lastname is not present", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "active",
      name: "John",
      email: "johndoe@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user",
    };
    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual("Last name is required");
  });
  it("should return an error when status is invalid", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "invalid",
      name: "John",
      email: "johndoe@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user",
    };
    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        `Invalid enum value. Expected 'active' | 'deactivate', received '${inputFields.status}'`,
      );
  });
  it("should return an error when email is invalid", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "active",
      name: "John Doe",
      email: "johndoeexample.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user",
    };
    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual("Email is invalid");
  });
  it("should return an error when password is weak", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "active",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123",
      confirmPassword: "123",
      role: "user",
    };
    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual("Password is weak");
  });
  it("should return an error when role is invalid", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "active",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "invalid",
    };
    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        `Invalid enum value. Expected 'admin' | 'user' | 'report', received '${inputFields.role}'`,
      );
  });
  it("should return an error when id is not uuid", () => {
    const inputFields = {
      id: "123",
      status: "active",
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "invalid",
    };
    const result = validator.userCreate(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual("Invalid uuid");
  });
});
