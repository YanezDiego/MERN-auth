const Validator = require('validator');
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    //Convert empty fields into empty strings.
    //Validator only works with strings.
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    
    //Checking if name is valid
    if(Validator.isEmpty(data.name)){
        errors.name = "Name field is required";
    }

    //Checking if Email is valid
    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    } else if( !Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    //Checking if password is valid
    if(Validator.isEmpty(data.password)){
        errors.password = "A Password is required";
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Password must match"
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})){
        errors.password = "Password must be at least 6 characters long";
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}