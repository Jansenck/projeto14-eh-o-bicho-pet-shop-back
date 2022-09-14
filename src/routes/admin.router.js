import express from "express";
import {
  populateDatabase,
  getDatabase,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/admin", populateDatabase);
router.get("/admin", getDatabase);

export default router;
