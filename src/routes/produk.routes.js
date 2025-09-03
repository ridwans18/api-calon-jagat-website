import { Router } from "express";
import {
  getallproduk,
  patchproduk,
  postproduk,
  deleteproduk,
  getallproduklimit,
  getitemproduk,
} from "../controller/produk.controller.js";
import upload from "../middleware/multer.js";

const produkrouter = Router();

produkrouter.get("/", getallproduk);
produkrouter.get("/limit", getallproduklimit);
produkrouter.get("/:id", getitemproduk);
produkrouter.post("/", upload.single("photo"), postproduk);
produkrouter.patch("/:id", upload.single("photo"), patchproduk);
produkrouter.delete("/:id", deleteproduk);

export default produkrouter;
