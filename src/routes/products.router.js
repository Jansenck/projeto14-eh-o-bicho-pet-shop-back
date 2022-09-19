import express from "express";
import {
  GetProducts,
  SingleProductPage,
  AddToCart,
} from "../controllers/ProductsControllers/products.controller.js";
import IsLogged from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/products", GetProducts);
router.get("/products/:productId", SingleProductPage);

router.post("/products/:productId/addtocart", IsLogged, AddToCart);

export default router;
