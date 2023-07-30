//Import model
const Song = require("../models/song")
//Impor dependencies
const fs = require("node:fs")
const path = require("node:path")
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
    Song.findOneAndDelete({ _id: songId }).then((deletedSong) => {
        if (!deletedSong) {
            return res.status(400).send({
                status: "Error",
                message: "Song Not found"
            })
        }
        return res.status(200).send({
            status: "Success",
            message: "Delete song method",
            song_removed: deletedSong
        })
    })
}
//Export actions
module.exports = {
    test,
    save,
    oneSong,
    list,
    update,
    remove
}