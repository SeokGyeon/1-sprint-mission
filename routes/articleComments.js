import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateComment } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/:articleId",
  validateComment,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Article comment added successfully" });
  })
);

router.get(
  "/:articleId",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get article comments (DB integration needed)" });
  })
);

export default router;
