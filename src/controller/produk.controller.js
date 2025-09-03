import {
  getallproduklimitdb,
  postprodukdb,
  deleteprodukdb,
  totalPagedb,
  getallprodukdb,
  getaprodukdb,
  patchprodukdb,
} from "../models/produk.models.js";
import { HOST_SERVER } from "../config/env.js";
import hapusFile from "../utility/hapusfile.js";

export const getitemproduk = async (req, res) => {
  const { id } = req.params;
  try {
    let [data] = await getaprodukdb(id);
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getallproduklimit = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const offset = (page - 1) * limit;

    let [data] = await getallproduklimitdb(+limit, +offset);
    const [totalpage] = await totalPagedb();

    const totalPage = Math.ceil(totalpage[0].total_page / limit);
    // console.log(totalPage);
    res.status(200).json({ succes: true, total_page: totalPage, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getallproduk = async (req, res) => {
  try {
    let [data] = await getallprodukdb();

    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postproduk = async (req, res) => {
  const { id, nama, harga, stock, deskripsi } = req.body;

  const { filename: imgname } = req.file;

  const img = `https://${HOST_SERVER}/assets/${imgname}`;

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
  const { id } = req.params;
  const { nama, harga, stock, deskripsi, oldimg } = req.body;
  let img = null;
  if (req.file) {
    const { filename: imgname } = req.file;
    img = `https://${HOST_SERVER}/assets/${imgname}`;
  } else {
    img = `https://${HOST_SERVER}/assets/${oldimg}`;
  }

  try {
    let data = null;

    if (req.file) {
      data = await patchprodukdb(id, nama, harga, stock, img, deskripsi);
      await hapusFile(oldimg);
    } else {
      data = await patchprodukdb(id, nama, harga, stock, img, deskripsi);
    }

    res.status(200).json({
      succes: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteproduk = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await deleteprodukdb(id);
    console.log(data);
    res.status(200).json({ succes: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
