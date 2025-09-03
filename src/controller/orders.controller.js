import {
  getallitemorderbystatusdb,
  getallitemorderdb,
  getitemorderdb,
  postitemorderdb,
} from "../models/items_order.models.js";
import {
  getallorderexpiredsdb,
  getallorderpaidsdb,
  patchorderbyselesaidb,
} from "../models/orders.models.js";

import generateKodeOrder from "../utility/generateKodeOrder.js";

export const getallorders = async (req, res) => {
  try {
    let data = await getallitemorderdb();
    data.produk.reduce((acc, item) => {
      return acc + item.harga * item.quantity;
    }, 0);
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getorders = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await getitemorderdb(id);

    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getorderspaid = async (req, res) => {
  try {
    let data = await getallorderpaidsdb();

    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getordersexpired = async (req, res) => {
  try {
    let data = await getallorderexpiredsdb();

    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getorderbystatus = async (req, res) => {
  try {
    let data = await getallitemorderbystatusdb();
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const patchorderselesai = async (req, res) => {
  const { id } = req.params;
  const { updateselesai } = req.body;
  try {
    let data = await patchorderbyselesaidb(id, updateselesai);
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
