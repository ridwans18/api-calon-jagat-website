import dbpool from "../config/database.js";

export const getallprodukdb = () => {
  return dbpool.query("SELECT * FROM produk");
};

export const postprodukdb = (nama, harga, stock, img, deskripsi) => {
  const sql = `INSERT INTO produk (nama_produk, harga, deskripsi, stock, img)
             VALUES (?, ?, ?, ?, ?)`;
  return dbpool.query(sql, [nama, harga, deskripsi, stock, img]);
};

export const patchprodukdb = (id, nama, harga, stock, img, deskripsi) => {
  const sql = `UPDATE produk SET nama_produk, harga, deskripsi, stock, img WHERE id
              VALUES (?, ?, ?, ?, ?)`;
  return dbpool.query(sql, [nama, harga, deskripsi, stock, img, id]);
};

export const deleteprodukdb = (id) => {
  const sql = `DELETE FROM produk WHERE id_produk = ?`;
  return dbpool.query(sql, [id]);
};
