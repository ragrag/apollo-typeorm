const PostgressConnectionStringParser = require("pg-connection-string");

const databaseUrl = process.env.DATABASE_DEVELOPMENT_URL;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);

module.exports = {
  type: "postgres",
  host: connectionOptions.host,
  port: connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/entities/migrations/**/*.ts"],
  subscribers: ["src/entities/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/entities/migrations",
    subscribersDir: "src/entities/subscribers",
  },
};
