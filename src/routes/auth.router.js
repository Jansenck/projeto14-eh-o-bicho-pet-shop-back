import express from "express";
import { validationSignUp, validationSignIn } from "../middlewares/auth.middleware.js"
import { createUser, checkUser } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signup", validationSignUp, createUser)
router.post("/signin", validationSignIn, checkUser)

export default router