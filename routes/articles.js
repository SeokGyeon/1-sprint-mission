import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateArticle } from "../middlewares/validation.js";

const router = express.Router();

// 게시글 등록
router.post(
  "/",
  validateArticle,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Article added successfully" });
  })
);

// 게시글 목록 조회 (페이지네이션 & 검색 기능)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get article list (DB integration needed)" });
  })
);

// 게시글 상세 조회
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({
      message: `Get article ${req.params.id} (DB integration needed)`,
    });
  })
);

// 게시글 수정
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Article ${req.params.id} updated successfully` });
  })
);

// 게시글 삭제
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Article ${req.params.id} deleted successfully` });
  })
);

export default router;
