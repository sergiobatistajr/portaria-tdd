import jwt from "./jwt";
import surf from "./surf";
import user from "./user";
async function isAuthenticated(req: Request) {
  const token = surf.getAuthToken(req);
  return await verifyAuth(token);
}

async function verifyAuth(token?: string) {
  if (!token) {
    return false;
  }
  const decoded = jwt.verify(token);
  const isUser = await user.findById(decoded.id);
  if (!isUser) {
    return false;
  }
  return {
    id: isUser.id,
    role: isUser.role,
  };
}
export default Object.freeze({
  isAuthenticated,
});
