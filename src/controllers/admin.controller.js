import db from "../database/db.js";

import { StatusCodes } from "http-status-codes";

async function populateDatabase(req, res) {
  const data = req.body;
  const adminPassword = req.headers.password;

  if (adminPassword === process.env.ADMIN_PASSWORD) {
    try {
      await db.collection("products").insertMany(data);
      res.sendStatus(StatusCodes.CREATED);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
}

async function getDatabase(req, res) {
  const adminPassword = req.headers.password;

  if (adminPassword === process.env.ADMIN_PASSWORD) {
    try {
      const products = await db.collection("products").find().toArray();
      res.send(products).status(StatusCodes.OK);
    } catch (err) {
      console.log(err.message);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
}

export { populateDatabase, getDatabase };
