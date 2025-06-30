import { Router } from "express";
import { getallorders, postorders } from "../controller/orders.controller.js";

const ordersrouter = Router();

ordersrouter.get("/", getallorders);
ordersrouter.post("/", postorders);

export default ordersrouter;
