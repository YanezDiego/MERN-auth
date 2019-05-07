const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

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
    if( !isValid ){
        return res.status(400).json(errors)
    }

    //Checking if it has been created
    User.findOne({email: req.body.email}).then(user => {
        if( user ){
            return res.status(400).json({email: "Email already exists."});
        } else {

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
        

            // Hashing the password before saving it to the DB.
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if( err ) throw err;
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

// @route POST api/users/login
// @desc Login user and return JWT token
// @access public

router.post("/login", (req, res) => {
    // form validation

    const {errors, isValid} = validateLoginInput(req.body)

    //check validation
    if( !isValid ){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    // finding the user by email.
    User.findOne({email}).then( user => {
        // check if the user is in the DB
        if( !user ){
            return res.status(404).json({emailnotfound: "Email not found"})
        }
        // check password with Bcrypt
        bcrypt.compare(password, user.password).then( isMatch => {
            if( isMatch ){
                // user password matches
                // Creating JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                }

                // JWT token signature
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Beareer " + token
                        });
                    }
                );
            } else {
                return res
                .status(400)
                .json({passwordincorrect: "Password Is Incorrect"});
            }
        })
    })
});

module.exports = router;