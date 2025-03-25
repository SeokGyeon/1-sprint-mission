import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();

//회원가입
router.post("/register", async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;
    if (!email || !nickname || !password) {
      return res.status(400).json({ message: "모든 필드를 입력하세요." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, nickname, password: hashedPassword },
    });

    res.status(201).json({ message: "회원가입 성공", user });
  } catch (error) {
    next(error);
  }
});

//로그인
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "이메일과 비밀번호를 입력하세요." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "유효하지 않은 이메일입니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "로그인 성공", token });
  } catch (error) {
    next(error);
  }
});

export default router;
