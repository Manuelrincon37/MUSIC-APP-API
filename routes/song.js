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
router.put("/update/:songId", check.auth, songController.update)
router.delete("/remove/:songId", check.auth, songController.remove)
//Export routes
module.exports = router
