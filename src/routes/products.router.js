import express from "express";
import {
  SingleProductPage,
  AddToCart,
  getCart,
} from "../controllers/products.controller.js";
import isUser from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/products/:productId", SingleProductPage);
router.post("/products/:productId/add", isUser, AddToCart);
router.get("/cart", getCart);

export default router;
