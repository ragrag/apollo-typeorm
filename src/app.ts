import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as passport from "passport";
import * as helmet from "helmet";
import * as hpp from "hpp";
import { createConnection } from "typeorm";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import authenticateWithJwtCookie from "./middlewares/jwt-cookie-auth.middleware";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import Routes from "./interfaces/routes.interface";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public app: express.Application;
  public port: string | number;
  public env: boolean;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.env = process.env.NODE_ENV === "production" ? true : false;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeGraphQL();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀  Server ready at http://localhost:${this.port}/graphql`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger("combined"));
      this.app.use(cors({ origin: "your.domain.com", credentials: true }));
    } else {
      this.app.use(logger("dev"));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser(process.env.JWT_SECRET));

    this.app.use(authenticateWithJwtCookie, (error, req, res, next) => {
      if (error) {
        req.user = null;
      }
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api/v1/", route.router);
    });

    this.app.get("/", (req, res, next) => {
      res.status(200).send("Hello");
    });
  }

  private initializeGraphQL() {
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        return { user: (req as any).user };
      },
    });
    apolloServer.applyMiddleware({ app: this.app });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToDatabase() {
    createConnection()
      .then(async (connection) => {
        console.log("Connected to db");
      })
      .catch((error) => console.log(error));
  }
}

export default App;
