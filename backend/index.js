const express = require("express");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { router: authRoutes, authenticate } = require("./auth");
const blogRoutes = require("./blog");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const profileRoutes = require("./profile");
const cors = require("cors");
dotenv.config();
const app = express();
const prisma = new PrismaClient();

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Blog API",
        version: "1.0.0",
        description: "API documentation for the blog-site backend",
      },
      servers: [
        {
          url: "http://localhost:3000/api",
        },
      ],
    },
    apis: ["./*.js"], // path to files with Swagger annotations
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:5173', 
//   credentials: true,
// }));

app.use(cors({
  origin: 'https://inkspire-dun.vercel.app', 
  credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/profile", profileRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
