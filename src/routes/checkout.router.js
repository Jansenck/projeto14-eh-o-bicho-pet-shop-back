import express from "express";
import { getCheckoutTicket } from "../controllers/checkout.controller.js";

const router = express.Router();
router.get("/checkout", getCheckoutTicket);

export default router;
