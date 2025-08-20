import dbpool from "../config/database.js";

export const getallprodukdb = () => {
  const sql = `SELECT * FROM produk `;
  return dbpool.query(sql);
};
export const getaprodukdb = (id) => {
  const sql = `SELECT * FROM produk WHERE id_produk = ? `;
  return dbpool.query(sql, [id]);
};
export const getallproduklimitdb = (limit, offset) => {
  const sql = `SELECT * FROM produk limit ? offset ? `;
  return dbpool.query(sql, [limit, offset]);
};

export const totalPagedb = () => {
  return dbpool.query("SELECT COUNT(*) as total_page FROM produk");
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
  console.log(id);
  const sql = `DELETE FROM produk WHERE id_produk = ?`;
  return dbpool.query(sql, [id]);
};

export const setOrderSelesai = async (id_orders) => {
  const query = `
    UPDATE orders
    SET selesai = 1
    WHERE id_orders = ?
  `;
  const [result] = await dbpool.query(query, [id_orders]);
  return result;
};
export const setOrderProses = async (id_orders) => {
  const query = `
    UPDATE orders
    SET proses = 1
    WHERE id_orders = ?
  `;
  const [result] = await dbpool.query(query, [id_orders]);
  return result;
};
