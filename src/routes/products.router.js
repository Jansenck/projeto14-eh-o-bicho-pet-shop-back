import express from "express";
import { SingleProductPage } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/products/:productId", SingleProductPage);

export default router;
