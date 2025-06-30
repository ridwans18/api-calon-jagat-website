import dbpool from "../config/database.js";
export const updatepaymentdb = (id, status) => {
  const sql = `UPDATE orders SET status_pembayaran = ? WHERE id_orders = ?`;
  return dbpool.query(sql, [status, id]);
};

export const checkorderbyid = (id) => {
  const sql = `SELECT * FROM orders WHERE id_orders = ?`;
  return dbpool.query(sql, [id]);
};
