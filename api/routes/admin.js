var express = require("express");
var router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/catagory", async (req, res) => {
  try {
    const catagory = await prisma.fourmCatagory.create({
      data: {
        name: req.body.catagory,
        description: req.body.description,
      },
    });
    res.status(201).json({ message: "Created!" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/catagories", async (req, res) => {
  try {
    const catagory = await prisma.fourmCatagory.findMany();

    res.status(200).json(catagory);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
