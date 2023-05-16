var express = require("express");
var router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/buttons", async (req, res) => {
  try {
    const buttons = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.status(200).json(buttons);
  } catch (err) {
    res.status(500);
  }
});
router.post("/search", async (req, res) => {
  try {
    const books = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${req.body.button}.json?api-key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.status(200).json(books);
  } catch (err) {
    res.status(500);
  }
});

router.post("/add", async (req, res) => {
  try {
    const book = await prisma.library.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.book_image,
        user: {
          connect: {
            rec_id: parseInt(req.body.user_id),
          },
        },
      },
    });
    res.status(201).json({ message: "Book added to your library!" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const books = await prisma.library.findMany({
      where: {
        userId: parseInt(req.params.id),
      },
      orderBy: {
        rec_id: "asc",
      },
    });
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update", async (req, res) => {
  try {
    if (parseInt(req.body.rating) > 10) {
      res.status(400).json({status: 400, message: "Number cannot be greater than 10" });
    } else {
      const book = await prisma.library.update({
        where: {
          rec_id: parseInt(req.body.book_id),
        },
        data: {
          rating: parseInt(req.body.rating),
          review: req.body.review,
        },
      });
      res.status(201).json({status: 201, message: "Book updated in your library!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/book/:id", async (req, res) => {
    try {
      const book = await prisma.library.findFirst({
        where: {
        rec_id: parseInt(req.params.id),
        }
       
      });
      res.status(200).json(book);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
