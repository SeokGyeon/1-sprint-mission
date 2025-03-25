import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import productRoutes from "./src/routes/products.js";
import postRoutes from "./src/routes/posts.js";
import commentRoutes from "./src/routes/comments.js";
import userRoutes from "./src/routes/users.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
