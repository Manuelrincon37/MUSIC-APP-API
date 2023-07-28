//Import dependencies
const express = require("express")
//Import authentication method
const check = require("../middleware/auth")
//Set multer config
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/artists/")
    },
    filename: (req, file, cb) => {
        cb(null, "artist-" + Date.now() + "-" + file.originalname)
    }
})
const uploads = multer({ storage })
//Load router
const router = express.Router()
//Import controller
const artistController = require("../controllers/artist")
//Define route
router.get("/artist-test", artistController.test)
router.post("/save", check.auth, artistController.save)
router.get("/artist/:id", check.auth, artistController.oneArtist)
router.get("/list/:page?", check.auth, artistController.list)
router.put("/update/:id", check.auth, artistController.update)
router.delete("/remove/:id", check.auth, artistController.remove)
router.post("/upload/:id", [check.auth, uploads.single("file0")], artistController.upload)
router.get("/image/:file", artistController.image)
//Export routes
module.exports = router
