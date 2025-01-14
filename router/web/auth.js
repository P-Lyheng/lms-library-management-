const express = require('express'); 
const router = express.Router(); 
const authController = require("../controller/auth")

router.get( "/register",authController.signupGet)
router.get("/login",authController.signinGet)


module.exports = {router}