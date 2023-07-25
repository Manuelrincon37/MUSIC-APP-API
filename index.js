//Import DB connection
const connection = require("./database/connection")
//Import dependencies
const express = require("express")
const cors = require("cors");
const { json } = require("body-parser");
//Welcome message
console.log("RUNNING MUSIC APP-API-REST");
//Execute DB connection
connection()
//Create NODE server
const app = express()
const port = 3910
//Config CORS
app.use(cors())
//Convert body data to Json objects
app.use(express.json())
app.use(express.urlencoded({ exrended: true }))
//Load routes configurations
const UserRoutes = require("./routes/user")
const ArtistRoutes = require("./routes/artist")
const AlbumRoutes = require("./routes/album")
const SongRoutes = require("./routes/song")

app.use("/api/user", UserRoutes)
app.use("/api/artist", ArtistRoutes)
app.use("/api/album", AlbumRoutes)
app.use("/api/song", SongRoutes)
//Test route
app.get("/test", (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Test"
    })
})
//Listen HTTP requests with server 
app.listen(port, () => {
    console.log(`Node server listening on port ${port}`);
})