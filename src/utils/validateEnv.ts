import { cleanEnv, port, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    DATABASE_DEVELOPMENT_URL: str(),
    PORT: port(),
    JWT_SECRET: str(),
    GITHUB_CLIENT_ID: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    FACEBOOK_APP_ID: str(),
    FACEBOOK_APP_SECRET: str(),
  });
}

export default validateEnv;
