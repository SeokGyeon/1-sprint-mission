import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateComment } from "../middlewares/validation.js";

const router = express.Router();

// 중고마켓 댓글 등록
router.post(
  "/:productId",
  validateComment,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Product comment added successfully" });
  })
);

// 중고마켓 댓글 조회 (커서 기반 페이지네이션)
router.get(
  "/:productId",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get product comments (DB integration needed)" });
  })
);

export default router;
