const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authenticate } = require("./auth"); // assumes you have an auth middleware

const router = express.Router();
const prisma = new PrismaClient();

// Create a blog post
router.post("/", authenticate, async (req, res) => {
  const { title, content, categoryId, published } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published ?? false,
        author: { connect: { id: req.user.userId } },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});

// Get all posts (optionally filter by published)
router.get("/", async (req, res) => {
  const { published } = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: published !== undefined ? { published: published === "true" } : {},
      include: {
        author: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error: error.message });
  }
});

// Update a post
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, content, categoryId, published } = req.body;

  try {
    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost || existingPost.authorId !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized or post not found" });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        published,
        category: categoryId ? { connect: { id: categoryId } } : { disconnect: true },
      },
    });

    res.json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
});

// Delete a post
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost || existingPost.authorId !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized or post not found" });
    }

    await prisma.post.delete({ where: { id } });

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
});

module.exports = router;
