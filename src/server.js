import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import adminRouter from "./routes/admin.router.js";
import productsRouter from "./routes/products.router.js";
import favoriteRouter from "./routes/favorites.router.js";
import cartRouter from "./routes/cart.router.js"
import checkoutRouter from "./routes/checkout.router.js"
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(authRouter);
app.use(adminRouter);
app.use(productsRouter);
app.use(cartRouter);
app.use(favoriteRouter);
app.use(checkoutRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
