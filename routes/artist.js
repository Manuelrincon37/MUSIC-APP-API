//Import dependencies
const express = require("express")
//Import authentication method
const check = require("../middleware/auth")
//Load router
const router = express.Router()
//Import controller
const artistController = require("../controllers/artist")
//Define route
router.get("/artist-test", artistController.test)
router.post("/save", check.auth, artistController.save)
router.get("/artist/:id", check.auth, artistController.oneArtist)
router.get("/list/:page?", check.auth, artistController.list)
//Export routes
module.exports = router
