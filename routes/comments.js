// Routes that involve comments
const log = console.log;

// express
const express = require("express");
const router = express.Router(); // Express Router

const { Comment, Post } = require("../models/post");

// to validate object IDs
const { ObjectID } = require("mongodb");

// helpers
const { mongoChecker } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

router.post("/api/addComment", mongoChecker, authenticate, async (req, res) => {
    const new_comment = new Comment({
        owner_id: req.user._id,
        owner: req.user.username,
        textContent: req.body.textContent,
    });
    try {
        const post = await Post.findById(req.body.post_id);
        post.comments.push(new_comment);
        await post.save();
        // `Comment for post ${req.body.post_id} made by ${req.user._id}: ${req.body.textContent}`
        res.send({ new_comment });
    } catch (error) {
        log(error);
        res.status(500).send("addComment: Internal Server Error");
    }
});

router.delete(
    "/api/removeComment/:postID/:commentID",
    mongoChecker,
    authenticate,
    async (req, res) => {
        const postID = req.params.postID;
        const commentID = req.params.commentID;
        // Validate id
        if (!ObjectID.isValid(postID) || !ObjectID.isValid(commentID)) {
            res.status(401).send("Post or comment not found");
            return;
        }
        try {
            const foundPost = await Post.findOne({ _id: postID });
            if (!foundPost) {
                res.status(404).send("Comment not found");
            } else {
                const comment = foundPost.comments.id(commentID);
                console.log(comment);
                if (!comment) {
                    res.status(404).send("Comment not found");
                } else if (
                    !comment.owner_id.equals(req.user._id) &&
                    req.user.role !== "admin"
                ) {
                    res.status(401).send("Unauthorized");
                } else {
                    await comment.remove();
                    const post = await foundPost.save();
                    res.send({ post, comment });
                }
            }
        } catch (error) {
            log(error);
            res.status(500).send(); // server error, could not delete.
        }
    }
);

// export the router
module.exports = router;
