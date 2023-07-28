//Import model Shcma form mongoose
const { Schema, model } = require("mongoose")

const AlbumSchema = Schema({
    artist: {
        type: Schema.ObjectId,
        ref: "Artist"
    },
    title: {
        type: String,
        require: true
    },
    description: String,
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

//Export model
module.exports = model("Album", AlbumSchema, "albums")   