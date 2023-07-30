//Import dependencies
const express = require("express")
const check = require("../middleware/auth")
//Set multer config
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/songs/")
    },
    filename: (req, file, cb) => {
        cb(null, "song-" + Date.now() + "-" + file.originalname)
    }
})
const uploads = multer({ storage })
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
router.post("/upload/:id", [check.auth, uploads.single("file0")], songController.upload)
router.get("/audio/:file", songController.audio)
//Export routes
module.exports = router
