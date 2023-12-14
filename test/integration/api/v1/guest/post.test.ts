import guestTestHelper from "./guest.test.helper";
let token: string | undefined = "";
const guest = {
  name: "John Doe",
  entry_date: new Date(),
  observation: "opa",
};
describe("API for create Vehicle", () => {
  beforeAll(async () => {
    await guestTestHelper.deleteGuest(guest.name);
    await guestTestHelper.deleteUser();
    await guestTestHelper.createUser();
    const resLoginUser = await guestTestHelper.loginUser();
    expect(resLoginUser.status).toEqual(200);
    token = resLoginUser.token;
  });
  afterAll(async () => {
    await guestTestHelper.deleteGuest(guest.name);
    await guestTestHelper.deleteUser();
  });

  it("POST /vehicle should return 200", async () => {
    const res = await guestTestHelper.createGuest(guest, token!);
    const body = await res.json();
    console.log(body);
    expect(res.status).toEqual(200);
  });
});
