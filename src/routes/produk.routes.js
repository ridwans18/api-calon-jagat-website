import { Router } from "express";
import {
  getallproduk,
  patchproduk,
  postproduk,
  deleteproduk,
  getallproduklimit,
} from "../controller/produk.controller.js";
import upload from "../middleware/multer.js";

const produkrouter = Router();

produkrouter.get("/", getallproduk);
produkrouter.get("/limit", getallproduklimit);
// produkrouter.get("/:id", getaproduk);
produkrouter.post("/", upload.single("photo"), postproduk);
produkrouter.patch("/", patchproduk);
produkrouter.delete("/:id", deleteproduk);

export default produkrouter;
