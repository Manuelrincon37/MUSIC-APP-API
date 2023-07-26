//Import dependencies
const express = require("express")
//Load router
const router = express.Router()
//Import controller
const userController = require("../controllers/user")
//Define route
router.get("/user-test", userController.test)
router.post("/register", userController.register)
router.post("/login", userController.login)
//Export routes
module.exports = router
