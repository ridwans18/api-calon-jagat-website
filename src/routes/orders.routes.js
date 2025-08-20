import { Router } from "express";
import {
  getallorders,
  getorders,
  postorders,
} from "../controller/orders.controller.js";

const ordersrouter = Router();

ordersrouter.get("/", getallorders);
ordersrouter.get("/:id", getorders);
ordersrouter.post("/", postorders);

export default ordersrouter;
