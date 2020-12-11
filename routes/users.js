// Routes that involve users
const log = console.log;

// express
const express = require("express");
const router = express.Router(); // Express Router

const { User } = require("../models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// helpers
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// A route to login and create a session
router.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then((user) => {
            if (!user) {
                return Promise.reject("User not available");
            }
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user_id = user._id;
            req.session.username = user.username;
            res.send({
                currentUser: user.username,
                curr_uid: user._id, // also send id ()
            });
        })
        .catch((error) => {
            res.status(400).send();
        });
});

// A route to logout a user
router.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send();
        }
    });
});

// a patch route to update a user's password
router.patch(
    "/api/updatePassword",
    mongoChecker,
    authenticate,
    async (req, res) => {
        try {
            // get admin user to update following relationship
            req.user.password = req.body.password;
            await req.user.save(); //encrypt in the backend
            res.send("Password Updated");
        } catch (error) {
            log(error); // log server error to the console, not to the client.
            if (isMongoError(error)) {
                // check for if mongo server suddenly dissconnected before this request.
                res.status(500).send("Internal server error");
            } else {
                res.status(400).send("Bad Request"); // 400 for bad request gets sent to client.
            }
        }
    }
);

router.post("/api/addUser", 
    mongoChecker, 
    async (req, res) => {
    log(`Adding User ${req.body.username}`);

    // Create a new user using the User mongoose model
    const user = new User({
        username: req.body.username,
        role: "user",
        password: req.body.password, // need to hash this
        following: [],
        follower: [],
        bookmarks: [],
    });

    // Save user to the database
    try {
        // get admin user to update following relationship
        const admin = await User.findById("5fd394c6391b14193c936d89");

        user.following.push(admin._id);
        admin.follower.push(user._id);

        const result = await user.save();
        await admin.save();
        res.send(result);
    } catch (error) {
        log(error); // log server error to the console, not to the client.
        if (isMongoError(error)) {
            // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send("Internal server error");
        } else {
            res.status(400).send("Bad Request"); // 400 for bad request gets sent to client.
        }
    }
});

router.get("/api/user", 
    mongoChecker, 
    authenticate, 
    async (req, res) => {
    // Get the current user
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404).send("Resource not found");
        } else {
            res.send(user);
        }
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/api/user/:id", 
    mongoChecker, 
    async (req, res) => {
    const id = req.params.id;

    // Good practise: Validate id immediately.
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Resource not found"); // if invalid id, definitely can't find resource, 404.
        return; // so that we don't run the rest of the handler.
    }

    // Get specific user
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send("Resource not found");
        } else {
            res.send(user);
        }
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch(
    "/api/updateProfileImgByLink",
    mongoChecker,
    authenticate,
    async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            console.log(req.query.image_url);
            user.profileImg = req.query.image_url;
            user.save();
            res.send("Successful");
        } catch (error) {
            res.status(400).send("400 Bad Request");
        }
    }
);

// export the router
module.exports = router;
