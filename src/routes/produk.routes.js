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
import { verifyJWT } from "../middleware/verifyJWT.middleware.js";

const produkrouter = Router();

produkrouter.get("/", getallproduk);
produkrouter.get("/limit", getallproduklimit);
produkrouter.get("/:id", getitemproduk);
produkrouter.post("/", verifyJWT, upload.single("photo"), postproduk);
produkrouter.patch("/:id", verifyJWT, upload.single("photo"), patchproduk);
produkrouter.delete("/:id", verifyJWT, deleteproduk);

export default produkrouter;
