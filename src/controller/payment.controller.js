import snap from "../config/midtrans.js";
import crypto from "crypto";
import { checkorderbyid } from "../models/payment.models.js";
import { SERVER_KEY_MIDTRANS } from "../config/env.js";
import { error } from "console";
import { updatepaymentdb } from "../models/payment.models.js";
import generateKodeOrder from "../utility/generateKodeOrder.js";
import { getpostordersdb } from "../models/orders.models.js";
import { postitemorderdb } from "../models/items_order.models.js";

export const paymentmidtrans = async (req, res) => {
  const { amount, data_pesanan, nama_pelanggan, email_pelanggan, phone } =
    req.body;
  console.log(req.body);
  try {
    const kodeorder = generateKodeOrder();
    const date_invoice = new Date().getTime();
    const no_invoice = `INV-${date_invoice}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;
    const status_pembayaran = "pending";

    let [data] = await getpostordersdb(
      kodeorder,
      nama_pelanggan,
      email_pelanggan,
      no_invoice,
      status_pembayaran
    );
    // console.log(kodeorder);
    await data_pesanan.map((data) => {
      postitemorderdb(kodeorder, data.id_produk, data.qty);
    });
    let parameter = {
      transaction_details: {
        order_id: kodeorder,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: nama_pelanggan,
        email: email_pelanggan,
        phone: phone,
      },
    };

    let transaction = await snap.createTransaction(parameter);
    let transactionToken = transaction.token;
    console.log(transactionToken);
    res.status(200).json({ token: transactionToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatestatusbasedonmidtrans = async (transaction_id, data) => {
  const hash = crypto
    .createHash("sha512")
    .update(
      `${transaction_id}${data.status_code}${data.gross_amount}${SERVER_KEY_MIDTRANS}`
    )
    .digest("hex");
  if (hash !== data.signature_key) {
    return {
      status: error,
      massage: "invalid signature key",
    };
  }
  let responseData = null;
  let transactionStatus = data.transaction_status;
  let fraudStatus = data.fraud_status;

  // console.log(transaction_id);
  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      let [transaction] = await updatepaymentdb(transaction_id, "paid");
      responseData = transaction;
      // console.log("paid", transaction);
    }
  } else if (transactionStatus == "settlement") {
    let [transaction] = await updatepaymentdb(transaction_id, "paid");
    responseData = transaction;
    // console.log("paid", responseData);
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "deny" ||
    transactionStatus == "expire"
  ) {
    let [transaction] = await updatepaymentdb(transaction_id, "failed");
    responseData = transaction;
    console.log("failed", responseData);
  } else if (transactionStatus == "pending") {
    let [transaction] = await updatepaymentdb(transaction_id, "pending");
    responseData = transaction;
    console.log("pending", responseData);
  }

  return {
    status: "success",
    data: responseData,
  };
};

export const statuspayment = async (req, res) => {
  const data = req.body;
  let datatransaction = null;

  let [transcation] = await checkorderbyid(data.order_id);
  // console.log(transcation[0]);
  if (transcation.length !== 0) {
    datatransaction = await updatestatusbasedonmidtrans(
      transcation[0].id_orders,
      data
    );
  }

  res.status(200).json({ status: "success", data: datatransaction });
};
