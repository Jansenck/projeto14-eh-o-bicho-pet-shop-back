import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import db from "../database/db.js";

async function getProductsInCart(req,res){

    const token = await req.headers.authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(StatusCodes.BAD_REQUEST);
    
    try {
        const user = await db.collection("sessions").findOne({token});
        const productsInCart = await db.collection("products_cart").find({userId: user.userId}).toArray();
    
        return res.send(productsInCart);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteProductInCart(req, res){

    const { productId } = req.params;
    
    const token = await req.headers.authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(StatusCodes.BAD_REQUEST);
    
    try {
        const user = await db.collection("sessions").findOne({token});
        if(!user) return res.sendStatus(StatusCodes.UNAUTHORIZED);
        
        await db.collection("products_cart").deleteOne({productId});
        return res.sendStatus(StatusCodes.OK);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function postTicketCheckout(req, res){
    
    const token = await req.headers.authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(StatusCodes.BAD_REQUEST);
    
    try {
        const user = await db.collection("sessions").findOne({token});
        if(!user) return res.sendStatus(StatusCodes.UNAUTHORIZED);

        const productsToCheckout = await db.collection("products_cart").find({userId: user.userId}).toArray();

        await db.collection("checkout_ticket").insertMany(productsToCheckout);
        return res.sendStatus(StatusCodes.OK);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getProductsInCart, deleteProductInCart, postTicketCheckout };