// Routes that involve user interactions
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

router.get("/api/followers", 
    mongoChecker, 
    authenticate, 
    async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("follower");
        if (!user.follower) {
            res.status(404).send("Resource not found");
        } else {
            res.send(user.follower);
        }
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/api/following", 
    mongoChecker, 
    authenticate, 
    async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("following");
        if (!user.following) {
            res.status(404).send("Resource not found");
        } else {
            res.send(user.following);
        }
    } catch (error) {
        log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.patch(
    "/api/updateUserRelation",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const curr_user = req.user; //from authenticate
        const profile_id = req.query.profile_id;

        console.log(curr_user, profile_id);

        if (!ObjectID.isValid(profile_id) || req.user._id.equals(profile_id)) {
            res.status(404).send("Invalid id"); // if invalid id, definitely can't find resource, 404.
            return; // so that we don't run the rest of the handler.
        }
        try {
            const profile_user = await User.findById(profile_id);

            if (!profile_user) {
                res.status(404).send("Resource not found"); // could not find this profile user (somehow)
            } else {
                if (curr_user.following.includes(profile_id)) {
                    // already following -> remove
                    curr_user.following = curr_user.following.filter(function (
                        ids
                    ) {
                        return !ids.equals(profile_id);
                    });
                    profile_user.follower = profile_user.follower.filter(
                        function (ids) {
                            return !ids.equals(curr_user._id);
                        }
                    );
                } else {
                    // not following -> add
                    curr_user.following.push(profile_id);
                    profile_user.follower.push(curr_user._id);
                }
                await curr_user.save();
                await profile_user.save();
                res.send({ curr_user });
            }
        } catch (error) {
            log(error); // log server error to the console, not to the client.
            if (isMongoError(error)) {
                // check for if mongo server suddenly disconnected before this request.
                res.status(500).send("Internal server error");
            } else {
                res.status(400).send("Bad Request"); // bad request
            }
        }
    }
);

// export the router
module.exports = router;
