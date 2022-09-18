import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/db.js";
import { StatusCodes } from "http-status-codes";

async function createUser(req, res) {

    const {
        name, 
        email, 
        cpf, 
        password, 
        confirmPassword,
        address
    } = req.body

  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    await db.collection("users").insertOne({
      name: name.trim(),
      email: email.trim(),
      password: encryptedPassword,
      cpf: cpf.trim(),
      address: address.trim()
    });

    res.sendStatus(StatusCodes.CREATED);

    } catch (error) {
    console.error(error);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    
  }
}

async function checkUser (req, res) {

    const user = res.locals.user
    delete user.password
   
    try {
        
        const checkSession = await db.collection("sessions").findOne({userId: user._id})

        if(checkSession) {
            return res.status(StatusCodes.OK).send({...user, token: checkSession.token})
        }

    const token = uuid();

    await db.collection("sessions").insertOne({ userId: user._id, token });
    res.status(StatusCodes.OK).send({ ...user, token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function deleteSession (req, res) {

  const {token} = res.locals.session

  try {

    await db.collection("sessions").deleteOne({token})
    res.sendStatus(202)

  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export { createUser, checkUser, deleteSession };