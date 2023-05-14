var express = require("express");
var router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

router.post('/search', async (req, res) => {
    try{
        console.log(req.body)
    }catch(err){
        res.status(500)
    }
})

module.exports = router