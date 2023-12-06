import argon2 from "argon2";
export default class Password {
  constructor() {}
  async hash(password: string) {
    const hash = await argon2.hash(password, {
      timeCost: 20,
    });
    return hash;
  }
  async verify(hash: string, password: string) {
    const result = await argon2.verify(hash, password);
    return result;
  }
}
