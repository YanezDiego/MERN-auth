const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const passport = require("passport")
const users = require("./routes/api/users")

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000

//BodyParser Middleware

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

//DB Config

mongoose.connect(process.env.DB, {useNewUrlParser: true})
    .then(() => console.log("MONGODB Connected"))
    .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport)


// Routes
app.use("/api/users", users)


    // mongoose.Promise = global.Promise  not needed with mongoose 5.0 and up

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next()
// });

app.listen( port, () => console.log(`You are on ${port}!`))