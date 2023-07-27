//Import authentication method
const check = require("../middleware/auth")
//Import dependencies
const express = require("express")
const multer = require("multer")
//Set multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + "-" + file.originalname)
    }
})
const uploads = multer({ storage })
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
router.put("/update", check.auth, userController.update)
router.post("/upload", [check.auth, uploads.single("file0")], userController.upload)
//Export routes
module.exports = router
