const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//Load input validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//load User Schema
const User = require("../../models/User");

//@route POST api/users/register
//@desc Register user
//@access Public

router.post("/register", (req, res) => {
    //Form Validations

    const {errors, isValid} = validateRegisterInput(req.body);

    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    //Checking if it has been created
    User.findOne({email: req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email: "Email already exists."});
        } else{
            
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
        

            // Hashing the password before saving it to the DB.
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    })
})
