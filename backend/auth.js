const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Signup
router.post("/signup", async (req, res) => {
  const { email, username, firstname, lastname, password } = req.body;

  if (!email || !username || !firstname || !lastname || !password) {
    return res.status(400).json({ message: "Email, username, first name, last name, and password are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    const existingUsername = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        firstname,
        lastname,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Middleware for Authentication
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = {
    router,
    authenticate
  };
  