import express from "express";
import { 
    listFavoriteProducts, 
    deleteFavoriteProduct 
} from "../controllers/favorites.controller.js";

const router = express.Router();

router.get("/favorites", listFavoriteProducts);
router.delete("/favorites", deleteFavoriteProduct);

export default router;
