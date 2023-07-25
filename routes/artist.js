//Import dependencies
const express = require("express")
//Load router
const router = express.Router()
//Import controller
const artistController = require("../controllers/artist")
//Define route
router.get("/artist-test", artistController.test)
//Export routes
module.exports = router
