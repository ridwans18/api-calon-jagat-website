import { SMTP_EMAIL } from "../../config/env.js";
import { transporter } from "../../config/nodemailer.js";

export const mailforgotpwd = (email, token) => {
  const mailOptions = {
    from: SMTP_EMAIL,
    to: email,
    subject: "Reset Password",
    html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Forgot Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      margin: 40px auto;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      color: #333;
    }
    .button {
      display: inline-block;
      padding: 12px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      font-size: 12px;
      color: #888;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 class="header">Reset Your Password</h2>
    <p>Hi,</p>
    <p>You recently requested to reset your password. Copy the code below:</p>
    <p style="text-align:center;">
      ${token}
    </p>
    <p>If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
    <p>Thanks,<br>The Calon Jagat Team</p>
    <div class="footer">
      © 2025 Calon Jagat. All rights reserved.
    </div>
  </div>
</body>
</html>
`,
  };
  return transporter.sendMail(mailOptions);
};
