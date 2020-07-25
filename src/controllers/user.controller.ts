import { NextFunction, Request, Response } from "express";

import { User } from "../entities/User";
import UserService from "../services/user.service";
import * as _ from "lodash";

class UserController {
  private userService: UserService = new UserService();

  public authenticateSocial = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = await UserService.createToken(req.user as User);

    res.cookie("Authorization", token, {
      httpOnly: true,
      signed: true,
    });
    const userResponse = _.pick(req.user, ["email", "displayName"]);
    return res.status(200).json({ token: token, user: userResponse });
  };

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("Authorization");
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
