const express = require('express') 
const router = express.Router(); 

const categoryController = require( "../controller/category")

router.get("/tbl_category", categoryController.getCategory)
router.post("/addCategory", categoryController.addCategory)
router.get ("/deleteCategory/:id", categoryController.deleteCategory)
router.get ("/editCategory/:id", categoryController.edit_category)
router.post("/editCategory", categoryController.editCategory)




module.exports = {router}