import db from "../../database/db.js";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";

async function AddToFavs(req, res) {
  const session = res.locals.session;
  const { productId } = req.params;

  try {
    const user = await db.collection("users").findOne({ _id: session.userId });

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (user && product) {
      const { insertedId } = await db.collection("favproducts").insertOne({
        userId: session.userId,
        productId,
        title: product.title,
        price: product.price,
      });
      res.sendStatus(StatusCodes.OK);
    } else if (!user) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    } else if (!product) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { AddToFavs };
