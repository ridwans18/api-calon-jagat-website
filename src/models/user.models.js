import dbpool from "../config/database.js";

export const getalluserdb = (email) => {
  const user = `SELECT * FROM user_admin WHERE email = ?`;
  return dbpool.query(user, [email]);
};

export const updateuserdb = (email, hashpassword) => {
  const user = `UPDATE user_admin SET hashpassword = ? WHERE email = ?`;
  return dbpool.query(user, [hashpassword, email]);
};

export const getuserbytokendb = (token) => {
  const user = `SELECT * FROM user_admin WHERE token = ?`;
  return dbpool.query(user, [token]);
};

export const updatetokendb = (token, email) => {
  const user = `UPDATE user_admin SET token = ?, expired_token = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?`;
  return dbpool.query(user, [token, email]);
};

export const createuserdb = (email, hashpassword) => {
  const user = `INSERT INTO user_admin (email, hashpassword) VALUES (?, ?)`;
  return dbpool.query(user, [email, hashpassword]);
};
