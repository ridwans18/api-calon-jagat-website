import dbpool from "../config/database.js";

export const getalluserdb = (email) => {
  const user = `SELECT * FROM user_admin WHERE email = ?`;
  return dbpool.query(user, [email]);
};

export const updateuserdb = (token, hashpassword) => {
  const user = `UPDATE user_admin SET hashpassword = ? WHERE token = ?`;
  return dbpool.query(user, [hashpassword, token]);
};

export const getuserbytokendb = (token) => {
  const user = `SELECT * FROM user_admin WHERE token = ?`;
  return dbpool.query(user, [token]);
};

export const updatetokendb = (token, email) => {
  const user = `UPDATE user_admin SET token = ?, expire_token = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?`;
  return dbpool.query(user, [token, email]);
};
