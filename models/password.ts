import argon2 from "argon2";

async function hash(password: string) {
  const hash = await argon2.hash(password);
  return hash;
}
async function verify(hash: string, password: string) {
  const result = await argon2.verify(hash, password);
  return result;
}

export default Object.freeze({
  hash,
  verify,
});
