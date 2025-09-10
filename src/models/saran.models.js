import dbpool from "../config/database.js";

export const getsarandb = () => {
  return dbpool.query("SELECT * FROM pesan_saran");
};

export const postsarandb = (nama, email, deskripsi) => {
  const sql = `INSERT INTO pesan_saran (nama,email,deskripsi ) values (?,?,?)`;
  return dbpool.query(sql, [nama, email, deskripsi]);
};
