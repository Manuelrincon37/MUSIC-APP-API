//Import jwt fn
const jwt = require("../helpers/jwt")
//Import dependencies
const bcrypt = require("bcrypt")
//Import Validate fn
const validate = require("../helpers/validate")
//Import User model
const User = require("../models/user")
//Test action
const test = (req, res) => {
    return res.status(200).send({
        status: "Success",
        message: "Sent from: controllers/user.js"
    })
}
//Register
const register = (req, res) => {
    //Get petition data
    let params = req.body // --> from www.url-encoded
    //Check data arrive correctly
    if (!params.name || !params.nick || !params.email || !params.password) {
        return res.status(400).send({
            status: "Error",
            message: "Missing data to send",
        })
    }

    //Validate data
    try {
        validate(params)
    } catch (error) {
        return res.status(400).send({
            status: "Error",
            message: "Validation Error"
        })
    }
    //Control duplicate users
    User.find({
        $or: [
            { email: params.email.toLowerCase() },
            { nick: params.nick.toLowerCase() }
        ]
    }).exec().then(async (users) => {
        if (users && users.length >= 1) {
            return res.status(409).send({
                status: "Error",
                message: "User alreay exist"
            })
        }
        //Cypher password
        let pwd = await bcrypt.hash(params.password, 10)
        params.password = pwd;
        //Create user object
        let userToSave = new User(params)
        //Save user in database
        userToSave.save().then((userSaved) => {
            if (!userSaved) {
                return res.status(500).send({
                    status: "Error",
                    message: "Register Error"
                })
            }
            //Clean and return object
            let userCleanedAndSaved = userSaved.toObject()
            delete userCleanedAndSaved.password;
            delete userCleanedAndSaved.role;
            //Return result
            return res.status(200).send({
                status: "Success",
                message: "Register method",
                user: userCleanedAndSaved
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Could not save new user in database"
            })
        })
    }).catch((error) => {
        return res.status(500).send({
            status: "Error",
            message: "Register Error"
        })
    })
}
const login = (req, res) => {
    //Get petitions params
    let params = req.body
    //Check if arrive
    if (!params.email || !params.password) {
        return res.status(400).send({
            status: "Error",
            message: "Missing data to send",
        })
    }
    //Find if exist in DB
    User.findOne({ email: params.email })
        .select("+password +role")
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    status: "Error",
                    message: "User does not exist",
                })
            }
            //Check password
            const pwd = bcrypt.compareSync(params.password, user.password)
            let identityUser = user.toObject()
            delete identityUser.password
            delete identityUser.role
            if (!pwd) {
                return res.status(404).send({
                    status: "Error",
                    message: "Password Error",
                })
            }
            //Get JWT token (create token service)
            const token = jwt.createToken(user)
            //Return: user & token
            return res.status(200).send({
                status: "Success",
                message: "Login method",
                user: identityUser,
                token
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Login Error"
            })
        })
}

const profile = (req, res) => {
    //Get user id by URL
    const id = req.params.id
    //find profile data
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send({
                status: "Error",
                message: "Profile not found"
            })
        }
        //return result
        return res.status(200).send({
            status: "Success",
            message: "Profile method",
            user: user
        })
    }).catch((error) => {
        return res.status(500).send({
            status: "Error",
            message: "Profiling Error"
        })
    })
}
//Export actions
module.exports = {
    test,
    register,
    login,
    profile
}