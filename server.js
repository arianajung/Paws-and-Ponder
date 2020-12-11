"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require("path");

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 1800000, //30 min
            httpOnly: true,
        },
    })
);

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (req.session.user_id) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

/** Import various routes **/
app.use(require("./routes/images"));
app.use(require("./routes/posts"));
app.use(require("./routes/comments"));
app.use(require("./routes/interactions"));
app.use(require("./routes/users"));
app.use(require("./routes/bookmarks"));
app.use(require("./routes/admins"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = [
        "/",
        "/login",
        "/main",
        "/signup",
        "/blog",
        "/settings",
        "/bookmarks",
        "/profile",
    ];
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
