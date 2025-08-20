import { config } from "dotenv";
import fs from "fs";

const envFile = fs.existsSync("./.env") ? "./.env" : "./.env.example";

config({
  path: envFile,
});

export const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_PASSWORD,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
  SMTP_EMAIL,
  SMTP_EMAIL_PASSWORD,
  SERVER_KEY_MIDTRANS,
  HOST_SERVER,
  //   SENDER_EMAIL,
  //   CRYPTO_KEY,
} = process.env;
