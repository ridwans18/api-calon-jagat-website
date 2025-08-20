import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

export const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (!authHeader || !token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded.email;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
