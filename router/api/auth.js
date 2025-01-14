const express = require('express'); 
const router = express.Router(); 
const authController = require("../../controller/auth")

router.post("/register",authController.signupPost)
router.post("/signin",authController.signinPost)


module.exports = {router}