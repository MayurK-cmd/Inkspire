const express = require("express");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { router: authRoutes, authenticate } = require("./auth");
const blogRoutes = require("./blog");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
