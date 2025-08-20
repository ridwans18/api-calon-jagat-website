import dbpool from "../config/database.js";

export const getReportMonth = () => {
  const query = `
    SELECT
      bulan.bulan,
      COALESCE(SUM(o.total_pembayaran), 0) AS total_pemasukan
    FROM (
      SELECT 1 AS bulan UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
      UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
    ) AS bulan
    LEFT JOIN orders o
      ON MONTH(o.tanggal_pembelian) = bulan.bulan
      AND o.status_pembayaran = 'paid'
      AND YEAR(o.tanggal_pembelian) = YEAR(CURDATE())
    GROUP BY bulan.bulan
    ORDER BY bulan.bulan ASC
  `;
  return dbpool.query(query);
};

export const getTotalPaidTransaction = () => {
  const query = `
    SELECT COUNT(*) AS jumlah_transaksi_paid
    FROM orders
    WHERE status_pembayaran = 'paid'
      AND YEAR(tanggal_pembelian) = YEAR(CURDATE())
  `;
  return dbpool.query(query);
};

export const getReportPorduct = () => {
  const query = `
    SELECT 
    p.id_produk,
    p.nama_produk,
    SUM(io.quantity) AS total_terjual
    FROM orders o
    JOIN items_order io ON o.id_orders = io.id_orders
    JOIN produk p ON io.id_produk = p.id_produk
    WHERE o.status_pembayaran = 'paid'
    GROUP BY p.id_produk, p.nama_produk;
  `;
  return dbpool.query(query);
};

export const getReportWeek = () => {
  const query = `
    SELECT 
      DATE(Tanggal_pembayaran) AS tanggal,
      SUM(Total_Pembayaran) AS total_pemasukan
    FROM pembayaran
    WHERE 
      status_pembayaran = 'paid' AND
      Tanggal_pembayaran >= CURDATE() - INTERVAL 7 DAY
    GROUP BY DATE(Tanggal_pembayaran)
    ORDER BY tanggal ASC
  `;
  return dbpool.query(query);
};

export const getReportDaily = () => {
  const query = `
    SELECT 
      SUM(total_pembayaran) AS total_pemasukan
    FROM orders
    WHERE 
      status_pembayaran = 'paid' AND
      DATE(tanggal_pembelian) = CURDATE()
  `;
  return dbpool.query(query);
};

export const getReportProductDaily = () => {
  const query = `
    SELECT 
    p.id_produk,
    p.nama_produk,
    SUM(io.quantity) AS total_terjual
    FROM orders o
    JOIN items_order io ON o.id_orders = io.id_orders
    JOIN produk p ON io.id_produk = p.id_produk
    WHERE o.status_pembayaran = 'paid'
    AND DATE(o.tanggal_pembelian) = CURDATE()
    GROUP BY p.id_produk, p.nama_produk;
  `;
  return dbpool.query(query);
};

export const getReportProduct = () => {
  const query = `
    SELECT 
      produk.nama_produk,
      SUM(items_order.quantity) AS total_quantity
    FROM produk
    JOIN items_order ON produk.id_produk = items_order.id_produk
    GROUP BY produk.id_produk
    ORDER BY total_quantity DESC
    LIMIT 5
  `;
  return dbpool.query(query);
};
