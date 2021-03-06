import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.HOST_NAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const MYSQL_HOST = process.env.MYSQL_HOST || 'cm-database';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'cmdb';
const MYSQL_USER = process.env.MYSQL_HOST || 'user';
const MYSQL_PASS = process.env.MYSQL_HOST || 'password';

const MYSQL = {
  username: MYSQL_USER,
  password: MYSQL_PASS,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST
};

const config = {
  server: SERVER,
  database: MYSQL
};

export default config;
