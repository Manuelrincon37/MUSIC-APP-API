//Import model
const Song = require("../models/song")
//Impor dependencies
const fs = require("node:fs")
const path = require("node:path")
const song = require("../models/song")
//Test action
const test = (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Sent from: controllers/song.js"
    })
}
const save = (req, res) => {
    //Get data from body
    let params = req.body
    //Create object with the model
    let song = new Song(params)
    //Save objet
    song.save().then((songSaved) => {
        if (!songSaved) {
            return res.status(400).send({
                status: "Error",
                message: "Could not save song"
            })
        }
        return res.status(200).send({
            status: "Success",
            message: "Save song method",
            songSaved
        })
    }).catch((error) => {
        return res.status(500).send({
            status: "Error",
            message: "Saving song server error",
            error
        })
    })
}
const oneSong = (req, res) => {
    //Get song id by url params
    let songId = req.params.id
    //Find song by id
    Song.findById(songId).populate({ path: "album" }).exec()
        .then((song) => {
            if (!song) {
                return res.status(404).send({
                    status: "Error",
                    message: "Song not found"
                })
            }
            return res.status(200).send({
                statu: "Error",
                message: "Get song method",
                song
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Get song method server error",
                error
            })
        })
}

const list = (req, res) => {
    //Get album id
    let albumId = req.params.albumId
    //Find album in db
    Song.find({ album: albumId }).populate({
        path: "album",
        populate: {
            path: "artist",
            model: "Artist"
        }
    })
        .sort("track").exec()
        .then((songs) => {
            if (!songs) {
                return res.status(404).send({
                    status: "Error",
                    message: "Songs not found"
                })
            }
            //return result
            return res.status(200).send({
                status: "Success",
                message: "List songs method",
                songs
            })
        })
}

const update = (req, res) => {
    //Get song id by url params
    let songId = req.params.songId
    //Get data to save from body
    let data = req.body
    //Find and update
    Song.findByIdAndUpdate(songId, data, { new: true }).exec()
        .then((songUpdated) => {
            if (!songUpdated) {
                return res.status(400).send({
                    status: "Error",
                    message: "Could not update song"
                })
            }
            return res.status(200).send({
                status: "Success",
                message: "List songs method",
                songUpdated
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Update song server error",
                error
            })
        })
}
const remove = (req, res) => {
    // get songId to remove
    const songId = req.params.songId

    Song.findOneAndDelete({ _id: songId })
        .then((deletedSong) => {
            if (!deletedSong) {
                return res.status(404).send({
                    status: "Error",
                    message: "Song Not found"
                })
            }
            return res.status(200).send({
                status: "Success",
                message: "Delete song method",
                song_removed: deletedSong
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Delete song server error"
            })
        })
}

const upload = (req, res) => {
    //Set upload configuration of Multer
    //Get artist id
    let songId = req.params.id
    //Get & check image file 
    if (!req.file) {
        return res.status(404).send({
            status: "Error",
            message: "No iamge file sended"
        })
    }
    //Get file.name
    let image = req.file.originalname
    //Get image info (extention)
    const imageSplit = image.split("\.")
    const extention = imageSplit[1]
    //Check if has a valid extention
    if (extention != "mp3" && extention != "ogg") {
        //Delete file
        const filePath = req.file.path
        const fileDeleted = fs.unlinkSync(filePath)
        //Return error
        return res.status(400).send({
            status: "Error",
            message: "Unvalid file extention"
        })
    }
    //If vali --> return response
    Song.findOneAndUpdate({ _id: songId }, { file: req.file.filename }, { new: true })
        .then((songUpdated) => {
            if (!songUpdated) {
                return res.status(400).send({
                    status: "Error",
                    message: "Upload file error"
                })
            }
            return res.status(200).send({
                status: "Success",
                messahe: "Upload song method",
                artist: songUpdated,
                file: req.file
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Upload file error"
            })
        })
}

const audio = (req, res) => {
    //Get params from URL
    const file = req.params.file
    //Mount file real path
    const filePath = "./uploads/songs/" + file
    //Chekc if file exist
    fs.stat(filePath, (error, exist) => {
        if (error || !exist) {
            return res.status(404).send({
                status: "Error",
                message: "File not found"
            })
        }
        //Return file as it is
        return res.sendFile(path.resolve(filePath))
    })
}
//Export actions
module.exports = {
    test,
    save,
    oneSong,
    list,
    update,
    remove,
    upload,
    audio
}