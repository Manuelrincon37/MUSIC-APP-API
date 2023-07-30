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
router.get("/one-song/:id", check.auth, songController.oneSong)
//Export routes
module.exports = router
