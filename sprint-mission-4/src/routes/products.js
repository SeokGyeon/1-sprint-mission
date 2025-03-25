import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

//상품 등록
router.post("/", authenticateUser, async (req, res) => {
  const { name, description, price, tags } = req.body;
  const userId = req.user.userId; // 로그인 유저

  if (!name || !description || !price) {
    return res.status(400).json({ message: "필수 입력값을 입력하세요." });
  }

  try {
    const product = await prisma.product.create({
      data: { name, description, price, tags, userId },
    });

    res.status(201).json({ message: "상품이 등록되었습니다.", product });
  } catch (error) {
    next(error);
  }
});

//상품 수정
router.patch("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, tags } = req.body;
  const userId = req.user.userId;

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    if (product.userId !== userId) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, tags },
    });

    res.status(200).json({ message: "상품이 수정되었습니다.", updatedProduct });
  } catch (error) {
    next(error);
  }
});

//상품 삭제
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    if (product.userId !== userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await prisma.product.delete({ where: { id } });
    res.status(200).json({ message: "상품이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
