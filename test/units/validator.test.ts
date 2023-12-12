import validator from "../../models/validator";

describe("Validator Create User Tests", () => {
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

describe("Validator Login User Tests", () => {
  it("should return an error when email is not valid", () => {
    const inputFields = {
      email: "johndoeexample.com",
      password: "password123",
    };
    const result = validator.userLogin(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual("Email is invalid");
  });
  it("should return an error when password is weak", () => {
    const inputFields = {
      email: "johndoe@example.com",
      password: "1234",
    };
    const result = validator.userLogin(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual("Password is weak");
  });
});

describe("Validator Create Vehicle Entry Tests", () => {
  it("should return valid input fields for vehicle", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: new Date(),
      plate: "FLK5E66",
      model: "Commander",
      pax: 2,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      observation: "opa",
    };

    const result = validator.createVehicleEntry(inputFields);

    expect(result.success).toEqual(true);
    if (result.success) expect(result.data).toEqual(inputFields);
  });
  it("should return error for invalid plate", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: new Date(),
      plate: "invalid",
      model: "Commander",
      pax: 2,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      observation: "opa",
    };

    const result = validator.createVehicleEntry(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        "A placa deve seguir o formato do Mercosul: ABC1234 ou ABC1D23",
      );
  });
  it("should return error for invalid status", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "dsadsa",
      name: "John Doe",
      entryDate: new Date(),
      plate: "FLK5E66",
      model: "Commander",
      pax: 2,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      observation: "opa",
    };

    const result = validator.createVehicleEntry(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        `Invalid enum value. Expected 'inside' | 'outside' | 'finished', received '${inputFields.status}'`,
      );
  });
  it("should return error for invalid pax", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: new Date(),
      plate: "FLK5E66",
      model: "Commander",
      pax: "-1",
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      observation: "opa",
    };

    const result = validator.createVehicleEntry(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        "Number must be greater than or equal to 1",
      );
  });
  it("should return error for entryDate seven days ago", () => {
    const date = new Date();
    const sevenDaysAgo = date.setDate(date.getDate() - 7);
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: new Date(sevenDaysAgo),
      plate: "FLK5E66",
      model: "Commander",
      pax: 1,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      observation: "",
    };

    const result = validator.createVehicleEntry(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        "A data de entrada deve estar entre 7 dias atrás e 7 dias à frente",
      );
  });
  it("should return error for entryDate seven days ahead", () => {
    const date = new Date();
    const sevenDaysAhead = date.setDate(date.getDate() + 7);
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: new Date(sevenDaysAhead),
      plate: "FLK5E66",
      model: "Commander",
      pax: 1,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      observation: "",
    };

    const result = validator.createVehicleEntry(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        "A data de entrada deve estar entre 7 dias atrás e 7 dias à frente",
      );
  });
  it("should return error for invalid apartment", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: new Date(),
      plate: "FLK5E66",
      model: "Commander",
      pax: 1,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      apartment: "-100",
      observation: "",
    };

    const result = validator.createVehicleEntry(inputFields);

    expect(result.success).toEqual(false);
    if (result.success) {
      return;
    } else if (result.error)
      expect(result.error.issues[0].message).toEqual(
        "O número do apartamento não é válido",
      );
  });
});

describe("Validator Create Guest Entry Tests", () => {
  it("should return true for guest create", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: new Date(),
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
    };

    const result = validator.createGuestEntry(inputFields);
    expect(result.success).toEqual(true);
  });
  it("without lastname should return false for guest create", () => {
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John",
      entryDate: new Date(),
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
    };

    const result = validator.createGuestEntry(inputFields);
    expect(result.success).toEqual(false);
  });
  it("seven days ahead entryDate should return false for guest create", () => {
    const date = new Date();
    const sevenDaysAhead = date.setDate(date.getDate() + 7);
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: sevenDaysAhead,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
    };

    const result = validator.createGuestEntry(inputFields);
    expect(result.success).toEqual(false);
  });
  it("seven days ago entryDate should return false for guest create", () => {
    const date = new Date();
    const sevenDaysAgo = date.setDate(date.getDate() - 7);
    const inputFields = {
      id: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
      status: "inside",
      name: "John Doe",
      entryDate: sevenDaysAgo,
      createdBy: "f42ecddb-f982-4702-b5c0-e1c5b878c80b",
    };

    const result = validator.createGuestEntry(inputFields);
    expect(result.success).toEqual(false);
  });
});
