import * as jwt from "jsonwebtoken";
import { User } from "../entities/User";

class UserService {
  public static async createToken(user: User): Promise<string> {
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60 * 24 * 14;
    const token: string = await jwt.sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn }
    );
    return token;
  }
}

export default UserService;
