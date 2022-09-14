import db from "../database/db.js";
import bcrypt from "bcrypt"
import { schemaSignUp } from "../schemas/schemas.js"

async function validationSignUp (req, res, next) {

    const {email, cpf} = req.body

    const {error} = schemaSignUp.validate(req.body, {abortEarly: false})

    if(error) {
        const errors = error.details.map(value => value.message)
        return res.status(STATUS.UNPROCESSABLE).send(errors)
    }

    try {
        const user = await db.collection("users").findOne({email})
        const userCpf = await db.collection("users").findOne({cpf})

        if (user || userCpf) {
            return res.sendStatus(STATUS.CONFLITC)
        }

    } catch (error) {
        console.error(error)
        return res.sendStatus(STATUS.SERVER_ERROR)
    }

    next()
}

export {validationSignUp}