import { postitemorderdb } from "../models/items_order.models.js";
import { getallordersdb, getpostordersdb } from "../models/orders.models.js";
import generateKodeOrder from "../utility/generateKodeOrder.js";

export const getallorders = async (req, res) => {
  try {
    let [data] = await getallordersdb();
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postorders = async (req, res) => {
  const { nama_pelanggan, email_pelanggan, data_pesanan } = req.body;

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

    await data_pesanan.map((data) => {
      postitemorderdb(kodeorder, data.id_produk, data.qty);
    });
    res.status(200).json({
      succes: true,
      data: {
        nama_pelanggan: nama_pelanggan,
        email_pelanggan: email_pelanggan,
        no_invoice: no_invoice,
        status_pembayaran: status_pembayaran,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
