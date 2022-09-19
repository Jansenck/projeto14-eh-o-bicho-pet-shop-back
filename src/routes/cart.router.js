import express from "express";
import { getProductsInCart, deleteProductInCart, postTicketCheckout } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/cart/", getProductsInCart);
router.delete("/cart/:productId", deleteProductInCart);
router.post("/cart", postTicketCheckout);

export default router;