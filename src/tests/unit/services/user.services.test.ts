import "dotenv/config";
import UserService from "../../../services/user.service";
import * as jwt from "jsonwebtoken";
import { User } from "../../../entities/User";

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500));
});

describe("Testing User Service", () => {
  it("testing createAuthToken() should return correct token", async () => {
    const id = 99;
    const token: string = await UserService.createToken(new User({ id: id }));
    const payload: string | object = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    expect(id).toBe((payload as any).id);
  });
});
