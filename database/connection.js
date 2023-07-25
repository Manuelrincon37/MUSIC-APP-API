//Import mongoose
const mongoose = require("mongoose")
//Connedction Method
const connection = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Music_App")
        console.log("Successfully connected to Database");
    } catch (error) {
        throw new Error("Could not connect to database")
    }
}
//Export connection
module.exports = connection