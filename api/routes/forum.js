var express = require("express");
var router = express.Router();
const date = require("date-and-time");
const { PrismaClient, Prisma } = require("@prisma/client");
const { verifyToken } = require("../middleware/verify");

const prisma = new PrismaClient();

router.get("/catagories", async (req, res) => {
  try {
    const catagory = await prisma.fourmCatagory.findMany({
      include: {
        topic: {
          include: {
            author: true,
          },
          orderBy: {
            rec_id: "desc",
          },
          take: 1,
        },
      },
    });

    res.status(200).json(catagory);
  } catch (err) {
    console.log(err);
  }
});

router.get("/catagory/:id", async (req, res) => {
  try {
    const catagory = await prisma.fourmCatagory.findFirst({
      where: {
        rec_id: parseInt(req.params.id),
      },
    });
    res.status(200).json(catagory);
  } catch (err) {
    console.log(err);
  }
});

router.get("/topics/:id", async (req, res) => {
  try {
    const posts = await prisma.fourmPost.findMany({
      where: {
        catagory_Id: parseInt(req.params.id),
      },
      include: {
        author: true,
      },
      orderBy: {
        rec_id: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/post", async (req, res) => {
  try {
    const topic = await prisma.fourmPost.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date().toLocaleString("en-us", { timeZone: "CST" }),
        author: {
          connect: {
            rec_id: parseInt(req.body.authorid),
          },
        },
        catagory: {
          connect: {
            rec_id: parseInt(req.body.catagory_id),
          },
        },
      },
    });
    res.status(201).json(topic);
  } catch (err) {
    console.log(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const post = await prisma.fourmPost.findFirst({
      where: {
        rec_id: parseInt(req.params.id),
      },
      include: {
        author: true,
      },
    });

    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
});

router.post("/post/comment", async (req, res) => {
  try {
    const topic = await prisma.fourmComment.create({
      data: {
        comment: req.body.comment,
        createdAt: new Date().toLocaleString("en-us", { timeZone: "CST" }),
        author: {
          connect: {
            rec_id: parseInt(req.body.authorid),
          },
        },
        post: {
          connect: {
            rec_id: parseInt(req.body.postid),
          },
        },
      },
    });
    res.status(201).json(topic);
  } catch (err) {
    console.log(err);
  }
});

router.get("/post/comments/:id", async (req, res) => {
  try {
    const comments = await prisma.fourmComment.findMany({
      where: {
        postid: parseInt(req.params.id),
      },
      include: {
        author: true,
      },
      orderBy: {
        rec_id: "desc",
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
