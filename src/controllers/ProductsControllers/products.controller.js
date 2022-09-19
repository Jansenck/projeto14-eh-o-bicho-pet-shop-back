import db from "../../database/db.js";
import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";

async function GetProducts(req, res) {
  const { category } = req.query;

  try {
    if (category) {
      const Products = await db
        .collection("products")
        .find({ category })
        .toArray();
      res.status(StatusCodes.OK).send(Products);
      return;
      // const catProducts = await db
      //   .collection("products")
      //   .find({ category })
      //   .toArray();
      // res.status(StatusCodes.OK).send(catProducts);
      // const fishProducts = await db
      //   .collection("products")
      //   .find({ category })
      //   .toArray();
      // res.status(StatusCodes.OK).send(fishProducts);
    } else {
      const allProducts = await db.collection("products").find().toArray();
      res.status(StatusCodes.OK).send(allProducts);
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function SingleProductPage(req, res) {
  const { productId } = req.params;

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (product) {
      return res.status(StatusCodes.OK).send(product);
    } else {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }
  } catch (err) {
    console.log(err.message);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function AddToCart(req, res) {
  const session = res.locals.session;
  const { productId } = req.params;

  try {
    const user = await db.collection("users").findOne({ _id: session.userId });

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(productId) });

    if (user && product) {
      const { insertedId } = await db.collection("products_cart").insertOne({
        userId: session.userId,
        productId,
        title: product.title,
        price: product.price,
        image: product.image,
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

export { GetProducts, SingleProductPage, AddToCart };
