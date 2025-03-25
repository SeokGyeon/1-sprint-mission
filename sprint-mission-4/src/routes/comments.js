import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

//상품 또는 게시글에 댓글 등록
router.post("/", authenticateUser, async (req, res) => {
  const { content, postId, productId } = req.body;
  const userId = req.user.userId;

  if (!content || (!postId && !productId)) {
    return res.status(400).json({ message: "내용과 대상 ID를 입력하세요." });
  }

  try {
    const comment = await prisma.comment.create({
      data: { content, userId, postId, productId },
    });

    res.status(201).json({ message: "댓글이 등록되었습니다.", comment });
  } catch (error) {
    next(error);
  }
});

//댓글 수정
router.patch("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    res.status(200).json({ message: "댓글이 수정되었습니다.", updatedComment });
  } catch (error) {
    next(error);
  }
});

//댓글 삭제
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await prisma.comment.delete({ where: { id } });
    res.status(200).json({ message: "댓글이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
