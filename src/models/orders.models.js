import dbpool from "../config/database.js";

export const getallordersdb = () => {
  return dbpool.query("SELECT * FROM orders");
};

export const getallorderpaidsdb = async () => {
  const query = `
    SELECT 
      o.id_orders,
      o.no_invoice,
      o.selesai,
      o.nama_pelanggan,
      o.status_pembayaran,
      o.tanggal_pembelian,
      o.total_pembayaran,
      p.id_produk,
      p.nama_produk,
      p.harga,
      io.quantity
    FROM orders o
    JOIN items_order io ON o.id_orders = io.id_orders
    JOIN produk p ON io.id_produk = p.id_produk
    WHERE o.status_pembayaran = 'paid'
  `;

  const [rows] = await dbpool.query(query);

  if (rows.length === 0) {
    return [];
  }

  // Gabungkan per order
  const ordersMap = {};
  rows.forEach((r) => {
    if (!ordersMap[r.id_orders]) {
      ordersMap[r.id_orders] = {
        id_orders: r.id_orders,
        no_invoice: r.no_invoice,
        selesai: r.selesai,
        nama_pelanggan: r.nama_pelanggan,
        status_pembayaran: r.status_pembayaran,
        tanggal_pembelian: r.tanggal_pembelian,
        produk: [],
        total_pembayaran: r.total_pembayaran,
      };
    }

    ordersMap[r.id_orders].produk.push({
      id_produk: r.id_produk,
      nama_produk: r.nama_produk,
      harga: r.harga,
      quantity: r.quantity,
    });
  });

  // Convert hasil object ke array
  return Object.values(ordersMap);
};

export const getallorderexpiredsdb = async () => {
  const query = `
    SELECT 
      o.id_orders,
      o.no_invoice,
      o.selesai,
      o.nama_pelanggan,
      o.status_pembayaran,
      o.tanggal_pembelian,
      o.total_pembayaran,
      p.id_produk,
      p.nama_produk,
      p.harga,
      io.quantity
    FROM orders o
    JOIN items_order io ON o.id_orders = io.id_orders
    JOIN produk p ON io.id_produk = p.id_produk
    WHERE o.status_pembayaran = 'pending' AND o.status_pembayaran = 'failed' 
  `;

  const [rows] = await dbpool.query(query);

  if (rows.length === 0) {
    return [];
  }

  // Gabungkan per order
  const ordersMap = {};
  rows.forEach((r) => {
    if (!ordersMap[r.id_orders]) {
      ordersMap[r.id_orders] = {
        id_orders: r.id_orders,
        no_invoice: r.no_invoice,
        selesai: r.selesai,
        nama_pelanggan: r.nama_pelanggan,
        status_pembayaran: r.status_pembayaran,
        tanggal_pembelian: r.tanggal_pembelian,
        produk: [],
        total_pembayaran: r.total_pembayaran,
      };
    }

    ordersMap[r.id_orders].produk.push({
      id_produk: r.id_produk,
      nama_produk: r.nama_produk,
      harga: r.harga,
      quantity: r.quantity,
    });
  });

  // Convert hasil object ke array
  return Object.values(ordersMap);
};

export const getpostordersdb = (
  id_orders,
  nama_pelanggan,
  email_pelanggan,
  no_invoice,
  status_pembayaran,
  total_pembayaran,
  phone
) => {
  const sql = `INSERT INTO orders (id_orders,nama_pelanggan, email_pelanggan, no_invoice,status_pembayaran, total_pembayaran, deadline_pembelian, selesai, nomor) VALUES (?, ?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR), 'false', ?)`;
  return dbpool.query(sql, [
    id_orders,
    nama_pelanggan,
    email_pelanggan,
    no_invoice,
    status_pembayaran,
    total_pembayaran,
    phone,
  ]);
};

export const patchorderbyselesaidb = (id_orders, status) => {
  const sql = `UPDATE orders SET selesai = ? WHERE id_orders = ?`;
  return dbpool.query(sql, [status, id_orders]);
};
