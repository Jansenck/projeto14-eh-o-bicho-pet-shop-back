import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import adminRouter from "./routes/admin.router.js";
import productsRouter from "./routes/products.router.js";
import favoriteRouter from "./routes/favorites.router.js";
dotenv.config();

const app = express();
// app.use(cors());

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);

app.options("*", cors());

// app.enableCors({
//   origin: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   credentials: true,
// });

app.use(json());
app.use(authRouter);
app.use(adminRouter);
app.use(productsRouter);
/* TODO: criar o cart router */
//app.use(cartRouter);
app.use(favoriteRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
