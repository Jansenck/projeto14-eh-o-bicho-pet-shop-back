import express from "express";
import { validationSignUp } from "../middlewares/auth.middleware.js"
import { createUser } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signup", validationSignUp, createUser)

export default router