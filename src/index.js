import { PORT } from "./config/env.js";
import express from "express";
import produkrouter from "./routes/produk.routes.js";
import ordersrouter from "./routes/orders.routes.js";
import user_adminrouter from "./routes/user_admin.routes.js";
import paymentrouter from "./routes/payment.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/produk", produkrouter);
app.use("/orders", ordersrouter);
app.use("/user_admin", user_adminrouter);
app.use("/payment", paymentrouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
