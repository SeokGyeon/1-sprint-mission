import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { authenticateUser } from "../middlewares/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

//유저 정보 조회
router.get("/m", authenticateUser, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        image: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//유저 정보 수정
router.patch("/m", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  const { nickname, image } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { nickname, image },
      select: {
        id: true,
        email: true,
        nickname: true,
        image: true,
        createdAt: true,
      },
    });

    res
      .status(200)
      .json({ message: "유저 정보가 수정되었습니다.", updatedUser });
  } catch (error) {
    next(error);
  }
});

//비밀번호 변경
router.patch("/m/password", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "유저 정보를 찾을 수 없습니다." });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "현재 비밀번호가 일치하지 않습니다." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "비밀번호가 변경되었습니다." });
  } catch (error) {
    next(error);
  }
});

//유저가 등록한 상품 목록 조회
router.get("/m/products", authenticateUser, async (req, res) => {
  const userId = req.user.userId;

  try {
    const products = await prisma.product.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

export default router;
