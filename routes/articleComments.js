import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateComment } from "../middlewares/validation.js";

const router = express.Router();

// 자유게시판 댓글 등록
router.post(
  "/:articleId",
  validateComment,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Article comment added successfully" });
  })
);

// 자유게시판 댓글 조회 (커서 기반 페이지네이션)
router.get(
  "/:articleId",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get article comments (DB integration needed)" });
  })
);

export default router;
