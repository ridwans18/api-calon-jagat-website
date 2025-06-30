import mysql from "mysql2";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "./env.js";

const dbpool = mysql
  .createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  })
  .promise();

dbpool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
  }
});

export default dbpool;
