const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authenticate } = require("./auth");

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog post management
 */

/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Error creating post
 */
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

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get all blog posts (optionally filter by published status)
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: published
 *         schema:
 *           type: boolean
 *         description: Filter by published status
 *     responses:
 *       200:
 *         description: List of blog posts
 *       500:
 *         description: Error fetching posts
 */
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

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get a single blog post by ID
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post data
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error fetching post
 */
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

/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               published:
 *                 type: boolean
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Error updating post
 */
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

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Not authorized
 *       500:
 *         description: Error deleting post
 */
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
