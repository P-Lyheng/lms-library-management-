const express = require('express'); 
const router = express.Router(); 
const authController = require("../controller/auth")

router.get( "/register",authController.signupGet)
router.post("/register",authController.signupPost)
router.get("/login",authController.signinGet)
router.post("/signin",authController.signinPost)


module.exports = {router}