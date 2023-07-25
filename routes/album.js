//Import dependencies
const express = require("express")
//Load router
const router = express.Router()
//Import controller
const albumController = require("../controllers/album")
//Define route
router.get("/user-test", albumController.test)
//Export routes
module.exports = router
