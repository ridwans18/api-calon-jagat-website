import { PORT } from "./src/config/env.js";
import express from "express";
import produkrouter from "./src/routes/produk.routes.js";
import ordersrouter from "./src/routes/orders.routes.js";
import user_adminrouter from "./src/routes/user_admin.routes.js";
import paymentrouter from "./src/routes/payment.routes.js";
import cors from "cors";
import reportrouter from "./src/routes/report.routes.js";
import saranroute from "./src/routes/saran.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // ini WAJIB biar cookie bisa ikut
  })
);
app.use("/assets", express.static("public/images"));

app.use("/produk", produkrouter);
app.use("/orders", ordersrouter);
app.use("/user_admin", user_adminrouter);
app.use("/payment", paymentrouter);
app.use("/report", reportrouter);
app.use("/saran", saranroute);

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
