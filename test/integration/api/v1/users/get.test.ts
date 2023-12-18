import webserver from "../../../../../infra/webserver";
import surf from "../../../../../models/surf";
import usersTestHelper from "./users.test.helper";
const URL = `${webserver.host}/api/v1/users`;
const expectedJSONKeys = ["users", "total_pages"];
const expectedUserKeys = ["id", "name", "email", "role", "status"];

function manageUsers(action: "create" | "delete") {
  let users = [];
  for (let i = 0; i < 11; i++) {
    const user = {
      name: `John Doe${i}`,
      role: "admin",
      email: `johndoe${i}@getusers.com`,
      password: "123456789",
      confirm_password: "123456789",
    };
    users.push(
      action === "create"
        ? usersTestHelper.createUser(user)
        : usersTestHelper.deleteUser(user),
    );
  }
  return users;
}

describe("GET API USERS ENDPOINT", () => {
  beforeAll(async () => {
    await Promise.all(manageUsers("create"));
  });
  afterAll(async () => {
    await Promise.all(manageUsers("delete"));
  });
  it("GET /users should return 200", async () => {
    const res = await surf.get(URL);
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(Object.keys(body).sort()).toEqual(expectedJSONKeys.sort());
    body.users.map((user: any) => {
      return expect(Object.keys(user).sort()).toEqual(expectedUserKeys.sort());
    });
  });
});
