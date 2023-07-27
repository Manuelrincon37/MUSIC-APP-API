const validator = require("validator")

const validate = (params) => {
    let name = !validator.isEmpty(params.name) &&
        validator.isLength(params.name, { min: 3, max: undefined }) &&
        validator.isAlpha(params.name, "es-ES");

    let nick = !validator.isEmpty(params.nick) &&
        validator.isLength(params.nick);

    let email = !validator.isEmpty(params.email) &&
        validator.isEmail(params.email);

    let password = !validator.isEmpty(params.password)

    if (params.surname) {
        let surname = !validator.isEmpty(params.surname) &&
            validator.isLength(params.surname, { min: 3, max: undefined }) &&
            validator.isAlpha(params.surname, "es-ES")
        if (!surname) {
            console.error("Surname invalid");
            throw new Error("Validation Error: surname")
        } else {
            console.log("Surname validated succesfully");
        }
    }
    if (!name || !nick || !email || !password) {
        throw new Error("Validation Error")
    } else {
        console.log("Validation Success");
    }
}

//Return validate fn
module.exports = validate