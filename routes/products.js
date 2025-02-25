import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { validateProduct } from "../middlewares/validation.js";

const router = express.Router();

// 상품 등록
router.post(
  "/",
  validateProduct,
  asyncHandler(async (req, res) => {
    res.status(201).json({ message: "Product added successfully" });
  })
);

// 상품 목록 조회 (페이지네이션 & 검색 기능)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    res.json({ message: "Get product list (DB integration needed)" });
  })
);

// 상품 상세 조회
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({
      message: `Get product ${req.params.id} (DB integration needed)`,
    });
  })
);

// 상품 수정
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Product ${req.params.id} updated successfully` });
  })
);

// 상품 삭제
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json({ message: `Product ${req.params.id} deleted successfully` });
  })
);

export default router;
