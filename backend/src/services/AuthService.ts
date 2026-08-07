import { IPayload } from "../auth/IPayload";
import { generateToken, verifyToken } from "../auth/json-web-token";
export class AuthService {
  generate(payload: IPayload) {
    return generateToken({
      id: payload.id,
      email: payload.email,
    });
  }
  verify(token: string) {
    return verifyToken(token);
  }
}