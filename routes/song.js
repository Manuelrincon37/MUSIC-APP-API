//Import dependencies
const express = require("express")
//Load router
const router = express.Router()
//Import controller
const songController = require("../controllers/song")
//Define route
router.get("/song-test", songController.test)
//Export routes
module.exports = router
