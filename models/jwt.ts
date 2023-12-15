import jwt, { SignOptions } from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "secret";
const jwtSignConfig = {
  expiresIn: "1d",
} satisfies SignOptions;

function sign(payload: { id: string; role: string }) {
  const token = jwt.sign(payload, jwtSecret, jwtSignConfig);
  return token;
}

function verify<T = { id: string; role: string }>(token: string) {
  return jwt.verify(token, jwtSecret) as T;
}

export default Object.freeze({
  sign,
  verify,
});
