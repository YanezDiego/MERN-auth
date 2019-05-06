const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    //converting empty fields into empty string to use with Validator

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Validating Emails
    if(Validator.isEmpty(data.email)){
        errors.email = "Email cannot be empty";
    } else if(!Validator.isEmail(data.email)){
        errors.email = "Email Type is invalid";
    }

    //Validating Password

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field cannot be empty";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};