import dbpool from "../config/database.js";
export const postitemorderdb = (id_orders, id_produk, jumlah) => {
  const sql = `INSERT INTO items_order (id_orders, id_produk, quantity) VALUES (?, ?, ?)`;
  return dbpool.query(sql, [id_orders, id_produk, jumlah]);
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
        produk: [],
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
      p.id_produk,
      p.nama_produk,
      p.harga,
      io.quantity
    FROM orders o
    JOIN items_order io ON o.id_orders = io.id_orders
    JOIN produk p ON io.id_produk = p.id_produk
    WHERE o.id_orders = ?
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
    total_pembayaran: rows.reduce((acc, r) => acc + r.harga * r.quantity, 0),
  };

  return order;
};

export const deleteitemorderdb = (id) => {
  const sql = `DELETE FROM items_order WHERE id_items_order = ?`;
  return dbpool.query(sql, [id]);
};
