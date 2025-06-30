import dbpool from "../config/database.js";
export const postitemorderdb = (id_orders, id_produk, jumlah) => {
  const sql = `INSERT INTO items_order (id_orders, id_produk, quantity) VALUES (?, ?, ?)`;
  return dbpool.query(sql, [id_orders, id_produk, jumlah]);
};

export const getallitemorderdb = () => {
  return dbpool.query("SELECT * FROM items_order");
};

export const deleteitemorderdb = (id) => {
  const sql = `DELETE FROM items_order WHERE id_items_order = ?`;
  return dbpool.query(sql, [id]);
};
