// Routes that involve posts

// express
const express = require("express");
const router = express.Router(); // Express Router

const { Post } = require("../models/post");
const { User } = require("../models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// helpers
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

router.get(
    "/api/getUserPosts",
    mongoChecker,
    authenticate,
    async (req, res) => {
        try {
            const posts = await Post.find({ owner_id: req.user._id }).sort({
                timeStamp: -1,
            }); // returns posts sorted by latest
            res.send({ posts });
        } catch (error) {
            log(error);
            res.status(500).send("getUserPosts: Internal Server Error");
        }
    }
);

//  returns an array containing all posts by the user given
//  request: { username: <username> }
//  response: [ {post1}, {post2}, {etc} ]
router.get(
    "/api/getProfilePosts",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const user_id = await User.findByUsername(req.query.username);
        try {
            const posts = await Post.find()
                .find({ owner_id: user_id })
                .sort({ timeStamp: -1 }); // returns posts sorted by latest
            res.send({ posts });
        } catch (error) {
            log(error);
            res.status(500).send("getProfilePosts: Internal Server Error");
        }
    }
);

// a route to get all posts for main (posts from all users the current user follows)
router.get(
    "/api/get-main-posts/",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const user_id = req.user._id;

        // array of id's of users that the current user follows
        let followingUsersArray;

        try {
            const followingUsers = await User.findOne({ _id: user_id })
                .populate("following")
                .exec();
            if (!followingUsers) {
                res.status(404).send("Resource not found");
            } else {
                followingUsersArray = followingUsers.following.map((user) => {
                    return user._id;
                });
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

        // find all posts that have its owner value with the user_id's in followingUsersArray
        try {
            const posts = await Post.find({
                owner_id: { $in: followingUsersArray },
            })
                .sort({
                    timeStamp: -1,
                })
                .populate();
            if (!posts) {
                res.status(404).send("Resource not found");
            } else {
                res.send({ posts });
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

router.get(
    "/api/getSearchedPost",
    mongoChecker,
    authenticate,
    async (req, res) => {
        try {
            const posts = await Post.find({
                $or: [
                    { tags: new RegExp(req.query.search_text, "i") },
                    { owner: new RegExp(req.query.search_text, "i") },
                ],
            }).sort({ timeStamp: -1 }); // returns posts sorted by latest
            res.send({ posts });
        } catch (error) {
            log(error);
            res.status(500).send("getProfilePosts: Internal Server Error");
        }
    }
);

router.post("/api/makePost", mongoChecker, authenticate, async (req, res) => {
    const new_post = new Post({
        owner_id: req.user._id,
        owner: req.user.username,
        textContent: req.body.textContent,
        images: req.body.images,
        likes: 0,
        comments: [],
        tags: req.body.tags,
    });
    try {
        const post = await new_post.save();
        res.send(post);
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

router.delete(
    "/api/removePost/:postID",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const postID = req.params.postID;
        // Validate id
        if (!ObjectID.isValid(postID)) {
            res.status(404).send("Post not found");
            return;
        }
        try {
            const removedPost = await Post.findOne({ _id: postID });
            if (!removedPost) {
                res.status(404).send("Resource not found");
            } else if (
                !removedPost.owner_id.equals(req.user._id) &&
                req.user.role !== "admin"
            ) {
                res.status(401).send("Unauthorized");
            } else {
                await removedPost.delete();
                res.send(removedPost);
            }
        } catch (error) {
            log(error);
            res.status(500).send(); // server error, could not delete.
        }
    }
);

// export the router
module.exports = router;
