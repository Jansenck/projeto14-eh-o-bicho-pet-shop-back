import express from "express";
import {
  GetProducts,
  SingleProductPage,
  AddToCart,
} from "../controllers/ProductsControllers/products.controller.js";
import { AddToFavs } from "../controllers/ProductsControllers/products.favs.controller.js";
import IsLogged from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/products", GetProducts);
router.get("/products/:productId", SingleProductPage);

router.post("/products/:productId/addtocart", IsLogged, AddToCart);
router.post("/products/:productId/fav", IsLogged, AddToFavs);

export default router;
