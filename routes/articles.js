import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateArticle } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/",
  validateArticle,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Article added successfully" });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get article list (DB integration needed)" });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({
      message: `Get article ${req.params.id} (DB integration needed)`,
    });
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Article ${req.params.id} updated successfully` });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Article ${req.params.id} deleted successfully` });
  })
);

export default router;
