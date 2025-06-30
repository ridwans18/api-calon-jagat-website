import nodemailer from "nodemailer";
import { SMTP_EMAIL, SMTP_EMAIL_PASSWORD } from "./env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_EMAIL_PASSWORD,
  },
});
