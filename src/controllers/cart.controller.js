import { StatusCodes } from "http-status-codes";
import db from "../database/db.js";

async function listProductsInCart(){
    try {
        const token = await req.authorization?.replace("Bearer ", "");
        if(!token) return 
    } catch (error) {
        
    }
}

/* TODO: criar cart controller */