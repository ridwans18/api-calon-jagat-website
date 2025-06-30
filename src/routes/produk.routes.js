import { Router } from "express";
import {
  getallproduk,
  patchproduk,
  postproduk,
  deleteproduk,
} from "../controller/produk.controller.js";

const produkrouter = Router();

produkrouter.get("/", getallproduk);
produkrouter.post("/", postproduk);
produkrouter.patch("/", patchproduk);
produkrouter.delete("/", deleteproduk);

export default produkrouter;
