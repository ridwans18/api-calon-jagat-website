import { Router } from "express";
import { getsaran, postsaran } from "../controller/saran.controller";

const saranroute = Router();

saranroute.get("/", getsaran);
saranroute.post("/", postsaran);

export default saranroute;
