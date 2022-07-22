require('dotenv/config');

const { DB_DIALECT = 'postgres' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const config = {
  [NODE_ENV]: {
    url: process.env[`${NODE_ENV.toUpperCase()}_DATABASE_URL`],
    dialect: DB_DIALECT,
  },
};
module.exports = config;
