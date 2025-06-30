import { Router } from "express";
import {
  paymentmidtrans,
  statuspayment,
} from "../controller/payment.controller.js";

const paymentrouter = Router();

paymentrouter.post("/", paymentmidtrans);
paymentrouter.post("/notification", statuspayment);

export default paymentrouter;
