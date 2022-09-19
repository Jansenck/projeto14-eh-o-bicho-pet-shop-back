import { StatusCodes } from "http-status-codes";
import db from "../database/db.js";

async function getProductsInCart(req,res){

    const token = await req.headers.authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(StatusCodes.BAD_REQUEST);

    
    try {
        const user = await db.collection("sessions").findOne({token});
        const productsInCart = await db.collection("products_cart").find({userId: user.userId}).toArray();
        console.log(productsInCart)
        return res.send(productsInCart);
    } catch (error) {
        console.log(error);
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
        console.log(error);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function postTicketCheckout(req, res){
    const token = await req.headers.authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(StatusCodes.BAD_REQUEST);

    const products = req.body;
    console.log(products);
    
    try {
        const user = await db.collection("sessions").findOne({token});
        if(!user) return res.sendStatus(StatusCodes.UNAUTHORIZED);
        
        await db.collection("checkout_ticket").insertMany({productId});
        return res.sendStatus(StatusCodes.OK);

    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getProductsInCart, deleteProductInCart, postTicketCheckout };