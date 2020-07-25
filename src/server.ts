import "reflect-metadata";
import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import UserRoutes from './routes/user.routes';

validateEnv();

const app = new App([
    new UserRoutes(),
]);

app.listen();
