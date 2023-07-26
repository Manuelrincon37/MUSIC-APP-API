const validator = require("validator")

const validate = (params) => {
    let name = !validator.isEmpty(params.name) &&
        validator.isLenght(params.name, { min: 3, max: undefined }) &&
        validator.isAplha(params.name, "es-ES");
    let nick = !validator.isEmpty(params.nick) &&
        validator.isLenght(params.nick);
    let email = !validator.isEmpty(params.email) &&
        validator.isEmail(params.email);
    let password = !validator.isEmpty(params.password)

    if (params.surname) {
        let surname = !validator.isEmpty(params.surname) &&
            validator.isLenght(params.surname, { min: 3, max: undefined }) &&
            validator.isAplha(params.surname, "es-ES")
        if (!surname) {
            throw new Error("Validation Error: surname")
        } else {
            console.log("Surname validated succesfully");
        }
        if (!name || !nick || !email || !password) {
            throw new Error("Validation Error")
        } else {
            console.log("Validation Success");
        }
    }
}