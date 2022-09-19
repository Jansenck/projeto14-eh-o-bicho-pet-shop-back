import { StatusCodes } from "http-status-codes";
import db from "../database/db.js";

async function getCheckoutTicket(req, res){

    const token = await req.headers.authorization?.replace("Bearer ", "");
    if(!token) return res.sendStatus(StatusCodes.BAD_REQUEST);
    
    try {
        const checkoutTicket = await db.collection("checkout").find().toArray();
        return res.send(checkoutTicket);
    } catch (error) {
        console.log(error);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getCheckoutTicket };