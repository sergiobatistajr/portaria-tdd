import jwt from "../../models/jwt";
type Payload = {
  id: string;
  role: string;
};
describe("JWT Module", () => {
  const payload: Payload = { id: "123", role: "admin" };
  let token: string = "";
  it("should sign the payload", () => {
    token = jwt.sign(payload);
    expect(token).toBeDefined();
  });

  it("should verify the token", () => {
    const decoded = jwt.verify<Payload>(token);
    expect(decoded.id).toEqual(payload.id);
    expect(decoded.role).toEqual(payload.role);
  });
});
