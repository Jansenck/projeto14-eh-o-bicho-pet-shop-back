import db from "../database/db.js";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";

async function SingleProductPage(req, res) {
  const { productId } = req.params;

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (product) {
      return res.status(StatusCodes.OK).send(product);
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { SingleProductPage };
