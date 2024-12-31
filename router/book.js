const express = require('express')
const router = express.Router();

const bookController = require ("../controller/book.js")

router.get("/tbl_book",bookController.getBook)
router.post("/addBook",bookController.addBook)
router.get("/deleteBook/:id",bookController.deleteBook)
router.get("/editBook/:id",bookController.edit_book)
router.post("/editBook",bookController.editBook)

module.exports = { router}


