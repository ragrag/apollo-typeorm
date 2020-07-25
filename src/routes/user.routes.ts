import { Router } from "express";
import * as passport from "passport";
import "../middlewares/passport";
import Routes from "../interfaces/routes.interface";
import UserController from "../controllers/user.controller";
import githubAccessTokenMiddleware from "../middlewares/githubAccessToken.middleware";
import googleAccessTokenMiddleware from "../middlewares/googleAccessToken.middleware";
import authenticateWithJwtCookie from "../middlewares/jwt-cookie-auth.middleware";

class UsersRoute implements Routes {
  public path = "/users";
  public router = Router();
  public userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/logout`,
      [authenticateWithJwtCookie],
      this.userController.logOut
    );
    this.router.post(
      `${this.path}/oauth/facebook`,
      [
        passport.authenticate("facebook-token", {
          session: false,
          scope: ["email"],
        }),
      ],
      this.userController.authenticateSocial,
      (error, req, res, next) => {
        if (error) {
          res.status(400).send(error.message);
        }
      }
    );
    this.router.post(
      `${this.path}/oauth/google`,
      [
        googleAccessTokenMiddleware,
        passport.authenticate("google-oauth-token", {
          session: false,
          scope: ["email"],
        }),
      ],
      this.userController.authenticateSocial,
      (error, req, res, next) => {
        if (error) {
          res.status(400).send(error.message);
        }
      }
    );
    this.router.post(
      `${this.path}/oauth/github`,
      [
        githubAccessTokenMiddleware,
        passport.authenticate("github-token", {
          session: false,
          scope: ["email"],
        }),
      ],
      this.userController.authenticateSocial,
      (error, req, res, next) => {
        if (error) {
          res.status(400).send(error.message);
        }
      }
    );
  }
}

export default UsersRoute;
