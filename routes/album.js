//Import dependencies
const express = require("express")
const check = require("../middleware/auth")
//Set multer config
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/albums/")
    },
    filename: (req, file, cb) => {
        cb(null, "album-" + Date.now() + "-" + file.originalname)
    }
})
const uploads = multer({ storage })
//Load router
const router = express.Router()
//Import controller
const albumController = require("../controllers/album")
//Define route
router.get("/album-test", albumController.test)
router.post("/save", check.auth, albumController.save)
router.get("/album/:id", check.auth, albumController.oneAlbum)
router.get("/list/:artistId", check.auth, albumController.list)
router.put("/update/:albumId", check.auth, albumController.update)
router.post("/upload/:id", [check.auth, uploads.single("file0")], albumController.upload)
router.get("/image/:file", albumController.image)
router.delete("/remove/:albumId", check.auth, albumController.remove)
//Export routes
module.exports = router
