import snakeCase from "../../models/snake-case";
describe("Test for snake case converter", () => {
  it("Should convert CamelCase to SnakeCase", () => {
    const jsObject = {
      entryDate: new Date(),
      createdBy: "1234567dada-dasdsa",
    };
    const expectedKeysInSnakeCase = ["entry_date", "created_by"];
    const result = snakeCase.keysToSnakeCase(jsObject);
    expect(Object.keys(result).sort()).toEqual(expectedKeysInSnakeCase.sort());
  });

  it("Should convert nested object keys to SnakeCase", () => {
    const jsObject = {
      firstName: "John",
      lastName: "Doe",
      address: {
        streetName: "123 Main St",
        city: "New York",
      },
    };
    const expectedKeysInSnakeCase = ["first_name", "last_name", "address"];
    const result = snakeCase.deepKeysToSnakeCase(jsObject);
    expect(Object.keys(result).sort()).toEqual(expectedKeysInSnakeCase.sort());
    expect(Object.keys(result.address).sort()).toEqual(
      ["street_name", "city"].sort(),
    );
  });

  it("Should convert array of objects keys to SnakeCase", () => {
    const jsObject = [
      {
        firstName: "John",
        lastName: "Doe",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
      },
    ];
    const expectedKeysInSnakeCase = ["first_name", "last_name"];
    const result = snakeCase.deepKeysToSnakeCase(jsObject);
    expect(result.length).toBe(jsObject.length);
    result.forEach((obj: any) => {
      expect(Object.keys(obj).sort()).toEqual(expectedKeysInSnakeCase.sort());
    });
  });
});
