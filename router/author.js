const express = require('express')
const router = express.Router();

const authorController = require ("../controller/author.js")

router.get("/tbl_author", authorController.getAuthor)
router.post("/addAuthor", authorController.createAuthor)
router.get("/deleteAuthor/:id", authorController.deleteAuthor)
router.get("/edit_author/:id", authorController.edit_author)
router.post("/editAuthor", authorController.editAuthor)




module.exports = {
     router
}
