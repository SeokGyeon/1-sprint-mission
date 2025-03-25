import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

//게시글 등록
router.post("/", authenticateUser, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용을 입력하세요." });
  }

  try {
    const post = await prisma.post.create({
      data: { title, content, userId },
    });

    res.status(201).json({ message: "게시글이 등록되었습니다.", post });
  } catch (error) {
    next(error);
  }
});

//게시글 수정
router.patch("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: "수정 권한이 없습니다." });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.status(200).json({ message: "게시글이 수정되었습니다.", updatedPost });
  } catch (error) {
    next(error);
  }
});

//게시글 삭제
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
