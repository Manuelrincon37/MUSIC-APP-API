//Test action
const test = (req, res) => {
    return res.satus(200).send({
        status: "Success",
        message: "Sent from: controllers/artist.js"
    })
}


//Export actions
module.exports = {
    test
}