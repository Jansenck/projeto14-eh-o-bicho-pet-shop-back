import express from "express";
import { 
    listFavoriteProducts, 
    deleteFavoriteProduct 
} from "../controllers/favorites.controller.js";

const router = express.Router();

router.get("/favorites/:productId", listFavoriteProducts);
router.delete("/favorites/:productId", deleteFavoriteProduct);

export default router;
