//Import dependencies
const jwt = require("jwt-simple")
const moment = require("moment")
//Create secret key
const secret = "SECRET_KEY_TOCYPHER_FOR_music-app-api_262782565"
//Create token generator function
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }
    //Reutrn token
    return jwt.encode(payload, secret)
}
//Export module
module.exports = { secret, createToken }