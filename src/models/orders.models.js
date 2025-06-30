import dbpool from "../config/database.js";

export const getallordersdb = () => {
  return dbpool.query("SELECT * FROM orders");
};

export const getpostordersdb = (
  id_orders,
  nama_pelanggan,
  email_pelanggan,
  no_invoice,
  status_pembayaran
) => {
  const sql = `INSERT INTO orders (id_orders,nama_pelanggan, email_pelanggan, no_invoice,status_pembayaran, deadline_pembelian) VALUES (?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))`;
  return dbpool.query(sql, [
    id_orders,
    nama_pelanggan,
    email_pelanggan,
    no_invoice,
    status_pembayaran,
  ]);
};
