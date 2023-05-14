var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("basic-auth");
const { PrismaClient, Prisma } = require("@prisma/client");
const { verifyToken } = require("../middleware/verify");

const prisma = new PrismaClient();

router.post("/verify", verifyToken, async (req, res) => {
  res.status(201).json({ Message: "JFJFJFJFJ" });
});

router.post("/login", async (req, res, next) => {
  const creds = auth(req);
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: creds.name,
      },
    });
    if (user) {
      const authenticate = bcrypt.compareSync(creds.pass, user.password);
      if (authenticate) {
        jwt.sign(
          { user: user },
          "secretkey",
          { expiresIn: "4h" },
          (err, token) => {
            res
              .status(201)
              .json({ token, user_id: user.rec_id, user_name: user.username });
          }
        );
      } else {
        res
          .status(500)
          .json({ message: "Sorry incorrect password or username" });
      }
    } else {
      res.status(500).json({ message: "Sorry that username dose not exist." });
    }
  } catch (err) {}
});

router.post("/signup", async (req, res, next) => {
  try {
    if (req.body.opt_in === "true") {
      req.body.opt_in = true;
    } else {
      req.body.opt_in = false;
    }
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        opt_in: req.body.opt_in,
      },
    });
    jwt.sign({ user: user }, "secretkey", { expiresIn: "4h" }, (err, token) => {
      res
        .status(201)
        .json({ token, user_id: user.rec_id, user_name: user.username });
    });
  } catch (err) {
    console.log(err);
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("PRISMA ERROR");
    }
    console.log("ERROR: ");
    console.log(err.message);
    if (err.meta.target) {
      res.status(500).send({ error: err.meta.target });
    } else {
      res.status(500).send({ error: err });
    }
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        rec_id: parseInt(req.params.id),
      },
      include: {
        posts: {
          orderBy: {
            rec_id: "desc",
          },
          take: 1,
        },
        comments: {
          orderBy: {
            rec_id: "desc",
          },
          take: 1,
        },
      },
    });

    res.status(200).json({
      username: user.username,
      email: user.email,
      is_paid: user.is_paid,
      opt_in: user.opt_in,
      location: user.location,
      bio: user.bio,
      hobbies: user.hobbies,
      posts: user.posts,
      comments: user.comments,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/editProfile", async (req, res) => {
  try {
    const updateProfile = await prisma.user.update({
      where: {
        rec_id: parseInt(req.body.id),
      },
      data: {
        location: req.body.location,
        bio: req.body.bio,
        hobbies: req.body.hobbies,
      },
    });

    res.status(201).json({
      message: "Profile Update Successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
