import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/db.js";
import { StatusCodes } from "http-status-codes"

async function createUser (req, res) {

    const {
        name, 
        email, 
        cpf, 
        password, 
        confirmPassword,
        adress
    } = req.body

    const encryptedPassword = bcrypt.hashSync(password, 10)

    try {
        
        await db.collection("users").insertOne({
            name: name.trim(),
            email: email.trim(),
            password: encryptedPassword,
            cpf: cpf.trim(),
            adress: adress.trim()
        })

        res.sendStatus(StatusCodes.CREATED)

    } catch (error) {
        console.error(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

export { createUser }