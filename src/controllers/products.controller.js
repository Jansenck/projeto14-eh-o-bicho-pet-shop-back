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

async function AddToCart(req, res) {
  const { title, price } = req.body;
  const session = res.locals.session;

  try {
    const user = await db.collection("users").findOne({ _id: session.userId });

    if (user) {
      const { insertedId } = await db.collection("selectedproducts").insertOne({
        userId: session.userId,
        title,
        price,
      });
      res.status(StatusCodes.OK).send(req.body);
    } else {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCart(req, res) {
  const session = res.locals.session;

  try {
    const productsInCart = await db
      .collection("selectedproducts")
      .find({ userId: session.userId })
      .toArray();

    res.send(productsInCart);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export { SingleProductPage, AddToCart, getCart };
