import { Router } from "express";
import { handleRefreshToken } from "../controller/refreshtoken.controller.js";

const refreshtokenRouter = Router();

refreshtokenRouter.post("/", handleRefreshToken);

export default refreshtokenRouter;
