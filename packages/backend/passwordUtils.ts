import crypto from "crypto";

export function genPassword(password: string, salt?: string) {
  salt ||= crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

export function validatePassword(password: string, hash: string, salt: string) {
  console.log("validate pw", password, hash, salt);
  return hash === genPassword(password, salt).hash;
}
