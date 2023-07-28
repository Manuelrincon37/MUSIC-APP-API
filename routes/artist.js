//Import dependencies
const express = require("express")
//Import authentication method
const check = require("../middleware/auth")
//Set multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-" + Date.now() + "-" + file.originalname)
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
//Export routes
module.exports = router
