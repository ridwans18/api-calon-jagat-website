import {
  createuserdb,
  getalluserdb,
  getuserbytokendb,
  updatetokendb,
  updateuserdb,
} from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
} from "../config/env.js";
import { mailforgotpwd } from "../utility/mailer/mailforgotpwd.js";
import { generateToken6 } from "../utility/generatenewtoken.js";

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await getalluserdb(email);
    if (user.length == 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user[0].hashpassword
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: "invalid password" });
    }

    const accessToken = jwt.sign(
      {
        id_user: user[0].id_user_admin,
        email: user[0].email,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRE }
    );

    const refreshToken = jwt.sign(
      {
        id_user: user[0].id_user_admin,
        email: user[0].email,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRE }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "login success",
      data: {
        Token: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleregister = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [existUser] = await getalluserdb(email);
    if (existUser.length > 0) {
      return res.status(409).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await createuserdb(email, hashPassword);
    res.status(200).json({ success: true, message: "register success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handletokenpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const [user] = await getalluserdb(email);
    if (user.length == 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const token = generateToken6();
    await updatetokendb(token, email);

    const sendemail = await mailforgotpwd(email, token);

    res.status(200).json({ success: true, message: "token password success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleforgetpassword = async (req, res) => {
  const { token } = req.params;
  const { email, password } = req.body;

  try {
    const [user] = await getuserbytokendb(token);

    if (user.length == 0)
      return res
        .status(404)
        .json({ message: "user not found / token invalid" });

    if (user[0].expire_token < Date.now()) {
      return res.status(404).json({ message: "token expired" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const response = await updateuserdb(email, hashPassword);

    res
      .status(200)
      .json({ success: true, message: "reset password success", response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handlelogout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  res
    .status(200)
    .json({ success: true, message: "logout success", clearLocal: true });
};
