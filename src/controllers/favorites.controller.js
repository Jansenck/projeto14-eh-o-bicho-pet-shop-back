import { StatusCodes } from "http-status-codes";
import db from "../database/db.js";

async function listFavoriteProducts(req, res){
    
    try {
        const token = await req.headers.authorization?.replace("Bearer ", "");
        if(!token) return res.sendStatus(StatusCodes.UNAUTHORIZED);

        const favorites = await db
            .collection("favorites")
            .find({token});
        if(!favorites) return res.sendStatus(StatusCodes.UNAUTHORIZED);

        return res.send(favorites);

    } catch (error) {
        console.error(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function deleteFavoriteProduct(req, res){

    
    try {
        const token = await req.headers.authorization?.replace("Bearer ", "");
        if(!token) return res.sendStatus(StatusCodes.BAD_REQUEST);
        
        
        const user = await db.collection("sessions").findOne({token});
        if(!user) return res.sendStatus(StatusCodes.UNAUTHORIZED);
        
        const favorite = await db.collection("favorites").findOne({token: token});
        
        db.collection("favorites").deleteOne({token: favorite.token});
        return res.sendStatus(StatusCodes.OK);

    } catch (error) {
        console.error(error);
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

export { listFavoriteProducts, deleteFavoriteProduct };