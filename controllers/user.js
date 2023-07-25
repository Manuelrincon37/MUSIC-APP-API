//Test action
const test = (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Sent from: controllers/user.js"
    })
}


//Export actions
module.exports = {
    test
}