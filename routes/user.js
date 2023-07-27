//Import authentication method
const check = require("../middleware/auth")
//Import dependencies
const express = require("express")
//Load router
const router = express.Router()
//Import controller
const userController = require("../controllers/user")
const user = require("../models/user")
//Define route
router.get("/user-test", userController.test)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/profile/:id", check.auth, userController.profile)
router.post("/update", check.auth, userController.update)
//Export routes
module.exports = router
