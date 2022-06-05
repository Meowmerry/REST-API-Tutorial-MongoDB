import jwt from "jsonwebtoken";
const fs = require('fs')
const path = require('path')


const PUBLIC_KEY = fs.readFileSync(path.join(__dirname + '/../../config', 'publickey.key'), 'utf8');
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname + '/../../config', 'privatekey.key'), 'utf8');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, PRIVATE_KEY, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
    };
  }
}
