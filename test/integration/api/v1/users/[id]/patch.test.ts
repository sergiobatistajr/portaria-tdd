import surf from "../../../../../../models/surf";
import webserver from "../../../../../../infra/webserver";
import usersTestHelper from "../users.test.helper";
const URL = `${webserver.host}/users`;
let id = "";
const user = {
  name: "John Doe",
  email: "johndoe@patchtest.com",
  role: "admin",
  password: "123456789",
  confirm_password: "123456789",
};
let token = "";
describe("Test PATCH users endpoint", () => {
  beforeAll(async () => {
    const resCreateUser = await usersTestHelper.createUser(user);
    expect(resCreateUser.status).toEqual(201);
    const resLoginUser = await usersTestHelper.loginUser(user);
    expect(resLoginUser.status).toEqual(200);
    token = resLoginUser.token!;
    const resUser = await usersTestHelper.findByEmail(user.email, token);
    const body = await resUser.json();
    id = body.users[0].id;
  });
  afterAll(async () => {
    await usersTestHelper.deleteUser(user);
  });
  it("PATCH /users should return 200", async () => {
    const url = `${URL}/${id}`;
    const res = await surf.patch(url, {
      body: { xd: "xd" },
    });
    expect(res.status).toEqual(201);
  });
});
