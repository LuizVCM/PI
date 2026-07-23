import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

interface Payload {
  id: number;
  email: string;
}

export function generateToken(payload: Payload) {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: Number(JWT_EXPIRES_IN) });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET!);
  } catch {
    return null;
  }
}