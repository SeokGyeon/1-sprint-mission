import express from "express";
import productRoutes from "./routes/products.js";
import articleRoutes from "./routes/articles.js";
import productCommentRoutes from "./routes/productComments.js";
import articleCommentRoutes from "./routes/articleComments.js";
import uploadRoutes from "./routes/uploads.js";
import asyncHandler from "./middlewares/asyncHandler.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/products", productRoutes);
app.use("/articles", articleRoutes);
app.use("/product-comments", productCommentRoutes);
app.use("/article-comments", articleCommentRoutes);
app.use("/upload", uploadRoutes);

app
  .route("/users")
  .get((req, res) => {
    res.json({ message: "Get users (DB integration needed)" });
  })
  .post((req, res) => {
    res.status(201).json({ message: "User created (DB integration needed)" });
  });

app.use(asyncHandler);

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
