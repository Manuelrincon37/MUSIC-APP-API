//Import modules || dependencies
const jwt = require("jwt-simple")
const moment = require("moment")
//Import Secret key
const { secret } = require("../helpers/jwt")
//Create middleware(funtion or method)
exports.auth = (req, res, next) => {
    //Check for Authentication header
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "Error",
            message: "Missing Authentication header"
        })
    }
    //Clean token
    let token = req.headers.authorization.replace(/['"]+/g, "")
    try {
        //Decode token
        console.log("entrando en el try");
        let payload = jwt.decode(token, secret);

        //Check token expiration
        if (payload.exp <= moment.unix()) {
            return res.status(401).send({
                status: "Error",
                message: "Authentication token expired"
            })
        }
        //Add user data to request
        req.user = payload
    } catch (error) {
        return res.status(403).send({
            status: "Error",
            message: "Authentication error"
        })
    }
    //next() ---> to execute controller
    next()
}
