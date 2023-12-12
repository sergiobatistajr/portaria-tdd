import surf from "../../../../../models/surf";
import webserver from "../../../../../infra/webserver";
describe("Test", () => {
  it("lista all", async () => {
    const res = await surf.get(`${webserver.host}/api/v1/listall`, {});
    const text = await res.text();

    console.log(text);
  });
});
