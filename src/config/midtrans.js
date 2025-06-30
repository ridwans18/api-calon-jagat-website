import midtransClient from "midtrans-client";
import { SERVER_KEY_MIDTRANS } from "./env.js";

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: SERVER_KEY_MIDTRANS,
});

export default snap;
