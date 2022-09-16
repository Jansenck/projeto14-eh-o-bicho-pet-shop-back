import db from "../database/db.js";
import { StatusCodes } from "http-status-codes";

async function IsLogged(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    res.locals.session = session;
  } catch (error) {
    console.error(error);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  next();
}

export default IsLogged;
