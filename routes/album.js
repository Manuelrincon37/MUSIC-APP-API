//Import dependencies
const express = require("express")
const check = require("../middleware/auth")
//Load router
const router = express.Router()
//Import controller
const albumController = require("../controllers/album")
//Define route
router.get("/album-test", albumController.test)
router.post("/save", check.auth, albumController.save)
router.get("/album/:id", check.auth, albumController.oneAlbum)
router.get("/list/:artistId", check.auth, albumController.list)

//Export routes
module.exports = router
