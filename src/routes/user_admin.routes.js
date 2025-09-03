import { Router } from "express";
import {
  handleLogin,
  handlelogout,
  handleregister,
  handletokenpassword,
} from "../controller/users.controller.js";
import { handleforgetpassword } from "../controller/users.controller.js";

const user_adminrouter = Router();

user_adminrouter.post("/login", handleLogin);
user_adminrouter.post("/logout", handlelogout);
user_adminrouter.post("/register", handleregister);
user_adminrouter.post("/forgetpassword/:token", handleforgetpassword);
user_adminrouter.post("/entertokenpassword", handletokenpassword);

export default user_adminrouter;
