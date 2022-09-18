import express from "express";
import { validationSignUp, validationSignIn } from "../middlewares/auth.middleware.js"
import IsLogged from "../middlewares/user.middleware.js";
import { createUser, checkUser, deleteSession } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signup", validationSignUp, createUser)
router.post("/signin", validationSignIn, checkUser)
router.delete("/logout", IsLogged, deleteSession)

export default router