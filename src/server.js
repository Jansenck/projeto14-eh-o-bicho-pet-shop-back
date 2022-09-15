import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import adminRouter from "./routes/admin.router.js";
import productsRouter from "./routes/products.router.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(authRouter);
app.use(adminRouter);
app.use(productsRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
