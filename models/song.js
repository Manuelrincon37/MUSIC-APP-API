//Import model Shcma form mongoose
const { Schema, model } = require("mongoose")

const SongSchema = Schema({
    album: {
        type: Schema.ObjectId,
        ref: "Album"
    },
    track: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    file: {
        type: String,
        defautl: "default.mp3"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

//Export model
module.exports = model("Song", SongSchema, "songs")   