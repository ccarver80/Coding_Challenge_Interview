var express = require("express");
var router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

router.get('/buttons', async (req, res) => {
    try{
        const buttons = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${process.env.API_KEY}`).then((res) => res.json())
        res.status(200).json(buttons)
    }catch(err) {
        res.status(500)
    }
})
router.post('/search', async (req, res) => {
    try{
        
        const books =  await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${req.body.button}.json?api-key=${process.env.API_KEY}`).then((res) => res.json())
        res.status(200).json(books)
    }catch(err){
        res.status(500)
    }
})

module.exports = router