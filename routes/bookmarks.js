// Routes that involve bookmarks
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

router.post(
    "/api/bookmarkPost/:postID",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const postID = req.params.postID;
        // Validate id
        if (!ObjectID.isValid(postID)) {
            res.status(401).send("Post not found");
            return;
        }
        try {
            const user = await User.findOne({ _id: req.user._id });
            if (!user) {
                res.status(404).send("Resource not found"); // could not find this profile user (somehow)
            } else {
                user.bookmarks.push(postID);
                await user.save();
                res.send(user.bookmarks);
            }
        } catch (error) {
            log(error);
            res.status(500).send(); // server error, could not delete.
        }
    }
);

router.delete(
    "/api/unbookmarkPost/:postID",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const postID = req.params.postID;
        // Validate id
        if (!ObjectID.isValid(postID)) {
            res.status(401).send("Post not found");
            return;
        }
        try {
            const user = await User.findOne({ _id: req.user._id });
            if (!user) {
                res.status(404).send("Resource not found"); // could not find this profile user (somehow)
            } else {
                user.bookmarks = user.bookmarks.filter((p) => {
                    return !p.equals(postID);
                });
                const updatedUser = await user.save();
                res.send(updatedUser);
            }
        } catch (error) {
            log(error);
            res.status(500).send(); // server error, could not delete.
        }
    }
);

router.get(
    "/api/getBookmarkPosts",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const user_id = req.user._id;

        try {
            const user = await User.findOne({ _id: user_id })
                .populate("bookmarks")
                .exec();
            if (!user) {
                res.status(404).send("Resource not found");
            } else {
                res.send(user.bookmarks);
            }
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

// export the router
module.exports = router;
