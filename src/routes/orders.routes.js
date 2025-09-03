import { Router } from "express";
import {
  getallorders,
  getordersexpired,
  getorderbystatus,
  getorders,
  patchorderselesai,
  postorders,
  getorderspaid,
} from "../controller/orders.controller.js";

const ordersrouter = Router();

ordersrouter.get("/", getallorders);
ordersrouter.get("/paid", getorderspaid);
ordersrouter.get("/expired", getordersexpired);
ordersrouter.get("/status", getorderbystatus);
ordersrouter.get("/:id", getorders);
ordersrouter.post("/", postorders);
ordersrouter.patch("/:id", patchorderselesai);

export default ordersrouter;
