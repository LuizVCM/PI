import { User } from "../models/User";
export function omitPassword(user: User) {
  const { senha, ...rest } = user;
  return rest;
}