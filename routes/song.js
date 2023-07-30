//Import dependencies
const express = require("express")
const check = require("../middleware/auth")
//Load router
const router = express.Router()
//Import controller
const songController = require("../controllers/song")
//Define route
router.get("/song-test", songController.test)
router.post("/save", check.auth, songController.save)
router.get("/one/:id", check.auth, songController.oneSong)
router.get("/list/:albumId", check.auth, songController.list)
//Export routes
module.exports = router
