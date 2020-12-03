"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require('path')

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// Refer to the below link to study middle ware and session setups.
// https://github.com/csc309-fall-2020/react-express-authentication/blob/master/server.js


// examples import the mongoose models
// const { Student } = require("./models/student");
// const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/dashboard"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});