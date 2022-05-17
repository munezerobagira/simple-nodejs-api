require("dotenv").config();
const { NODE_ENV = "development" } = process.env;
const config = {
  [`${NODE_ENV}`]: {
    username: process.env[`DB_USERNAME`],
    password: process.env[`DB_PASSWORD`],
    database: process.env[`DB_DATABASE_${NODE_ENV.toLocaleUpperCase()}`],
    host: process.env[`DB_HOST`],
    dialect: "postgres",
  },
};
console.log(config);
module.exports = config;
