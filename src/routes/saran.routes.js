import { Router } from "express";
import { getsaran, postsaran } from "../controller/saran.controller.js";

const saranroute = Router();

saranroute.get("/", getsaran);
saranroute.post("/", postsaran);

export default saranroute;
