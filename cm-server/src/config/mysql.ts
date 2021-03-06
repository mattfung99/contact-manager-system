import mysql from 'mysql2';
import config from './config';

const dbParams = {
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: config.database.database
};

const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(dbParams);
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });

const Query = async (connection: mysql.Connection, query: string) =>
  new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });

export { Connect, Query };
