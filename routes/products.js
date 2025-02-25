import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateProduct } from "../middlewares/validation.js";

const router = express.Router();

router.post(
  "/",
  validateProduct,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Product added successfully" });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get product list (DB integration needed)" });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({
      message: `Get product ${req.params.id} (DB integration needed)`,
    });
  })
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Product ${req.params.id} updated successfully` });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Product ${req.params.id} deleted successfully` });
  })
);

export default router;
