const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

dotenv.config();
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";


router.post("/signup", async (req, res) => {
  const { email, username, firstname, lastname, password } = req.body;

  if (!email || !username || !firstname || !lastname || !password) {
    return res.status(400).json({
      message: "Email, username, first name, last name, and password are required",
    });
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

// Auth middleware
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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or SMTP config
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `https://inkspire-dun.vercel.app//reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() }, // token still valid
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = {
  router,
  authenticate,
};
