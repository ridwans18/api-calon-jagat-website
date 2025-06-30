import {
  getallprodukdb,
  postprodukdb,
  deleteprodukdb,
} from "../models/produk.models.js";

export const getallproduk = async (req, res) => {
  try {
    let [data] = await getallprodukdb();
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postproduk = async (req, res) => {
  const { id, nama, harga, stock, img, deskripsi } = req.body;

  try {
    let data = await postprodukdb(nama, harga, stock, img, deskripsi);
    console.log(data);
    res.status(200).json({
      succes: true,
      data: { nama: nama, harga: harga, stock: stock, img: img },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const patchproduk = async (req, res) => {
  const { id, nama, harga, stock, img, deskripsi } = req.body;

  try {
    let data = await postprodukdb(nama, harga, stock, img, deskripsi);
    console.log(data);
    res.status(200).json({
      succes: true,
      data: { nama: nama, harga: harga, stock: stock, img: img },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteproduk = async (req, res) => {
  const { id } = req.body;

  try {
    let data = await deleteprodukdb(id);
    console.log(data);
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
