import dbpool from "../config/database.js";
export const postitemorderdb = (id_orders, id_produk, jumlah) => {
  const sql = `INSERT INTO items_order (id_orders, id_produk, quantity) VALUES (?, ?, ?)`;
  return dbpool.query(sql, [id_orders, id_produk, jumlah]);
};

export const updatestockdb = (id_order) => {
  const sql = `UPDATE produk p
  JOIN items_order io ON p.id_produk = io.id_produk
  SET p.stock = p.stock - io.quantity
  WHERE io.id_orders = ?`;
  return dbpool.query(sql, [id_order]);
};

export const updateincrementstockdb = (id) => {
  const sql = `UPDATE produk p
  JOIN items_order io ON p.id_produk = io.id_produk
  SET p.stock = p.stock + io.quantity
  WHERE io.id_orders = ?`;
  return dbpool.query(sql, [id]);
};
export const getallitemorderdb = async () => {
  const query = `
    SELECT 
      o.id_orders,
      o.nama_pelanggan,
      o.status_pembayaran,
      o.tanggal_pembelian,
      p.id_produk,
      p.nama_produk,
      p.harga,
      o.total_pembayaran,
      o.selesai,
      io.quantity
    FROM orders o
    JOIN items_order io ON o.id_orders = io.id_orders
    JOIN produk p ON io.id_produk = p.id_produk
    
    ORDER BY o.tanggal_pembelian DESC
  `;

  const [rows] = await dbpool.query(query);

  // Group by id_orders
  const grouped = {};
  for (const row of rows) {
    if (!grouped[row.id_orders]) {
      grouped[row.id_orders] = {
        id_orders: row.id_orders,
        nama_pelanggan: row.nama_pelanggan,
        status_pembayaran: row.status_pembayaran,
        tanggal_pembelian: row.tanggal_pembelian,
        selesai: row.selesai,
        produk: [],
        total_pembayaran: row.total_pembayaran,
      };
    }

    grouped[row.id_orders].produk.push({
      id_produk: row.id_produk,
      nama_produk: row.nama_produk,
      harga: row.harga,
      quantity: row.quantity,
    });
  }

  return Object.values(grouped);
};

export const getallitemorderbystatusdb = async () => {
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
    WHERE o.selesai = 0
      AND o.status_pembayaran = 'paid'
    ORDER BY o.tanggal_pembelian DESC
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
        proses: r.proses,
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

export const getitemorderdb = async (id_orders) => {
  const query = `
    SELECT 
      o.id_orders,
      o.no_invoice,
      o.proses,
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
    WHERE o.id_orders = ? AND o.status_pembayaran = "paid"
    ORDER BY o.tanggal_pembelian DESC
  `;

  const [rows] = await dbpool.query(query, [id_orders]);

  if (rows.length === 0) {
    return null; // kalau data tidak ditemukan
  }

  // mapping ke bentuk sesuai contoh kamu
  const order = {
    id_orders: rows[0].id_orders,
    no_invoice: rows[0].no_invoice,
    proses: rows[0].proses,
    selesai: rows[0].selesai,
    nama_pelanggan: rows[0].nama_pelanggan,
    status_pembayaran: rows[0].status_pembayaran,
    tanggal_pembelian: rows[0].tanggal_pembelian,
    produk: rows.map((r) => ({
      nama_produk: r.nama_produk,
      harga: r.harga,
      quantity: r.quantity,
    })),
    total_pembayaran: rows[0].total_pembayaran,
  };

  return order;
};

export const deleteitemorderdb = (id) => {
  const sql = `DELETE FROM items_order WHERE id_items_order = ?`;
  return dbpool.query(sql, [id]);
};
