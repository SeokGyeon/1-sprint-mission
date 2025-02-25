import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateComment } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/:productId",
  validateComment,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Product comment added successfully" });
  })
);

router.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get product comments (DB integration needed)" });
  })
);

export default router;
