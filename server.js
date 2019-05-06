const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000

//BodyParser Middleware

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

//DB Config

mongoose.connect(process.env.DB, {useNewUrlParser: true})
    .then(() => console.log("MONGODB Connected"))
    .catch(err => console.log(err));

    // mongoose.Promise = global.Promise  not needed with mongoose 5.0 and up

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.use(bodyParser.json());

app.listen( port, () => console.log(`listening on ${port}!`))