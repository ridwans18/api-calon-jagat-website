import { getsarandb, postsarandb } from "../models/saran.models.js";

export const postsaran = async (req, res) => {
  const { namapelanggan, email, saran } = req.body;
  try {
    await postsarandb(namapelanggan, email, saran);
    res
      .status(200)
      .json({ succes: true, data: { namapelanggan, email, saran } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getsaran = async (req, res) => {
  try {
    let [data] = await getsarandb();
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
