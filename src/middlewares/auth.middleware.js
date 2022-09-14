import db from "../database/db.js";
import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-codes"
import { schemaSignUp } from "../schemas/auth.schema.js"

async function validationSignUp (req, res, next) {

    const {email, cpf} = req.body

    const {error} = schemaSignUp.validate(req.body, {abortEarly: false})

    if(error) {
        const errors = error.details.map(value => value.message)
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(errors)
    }

    try {
        const user = await db.collection("users").findOne({email})
        const userCpf = await db.collection("users").findOne({cpf})

        if (user || userCpf) {
            return res.sendStatus(StatusCodes.CONFLICT)
        }

    } catch (error) {
        console.error(error)
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }

    next()
}

export {validationSignUp}