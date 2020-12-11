// Routes that involve users
const log = console.log;

// express
const express = require("express");
const router = express.Router(); // Express Router

const { User } = require("../models/user");
const { Post } = require("../models/post");


// helpers
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

router.patch('/api/updateProfileImgByLink', mongoChecker, authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        console.log(req.query.image_url);
        user.profileImg = req.query.image_url;
        user.save();
        res.send("Successful");
    } catch (error) {
        res.status(400).send("400 Bad Request");
    }
})

router.get('/api/getUserStats', mongoChecker, authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = await Post.find({ owner_id: req.user._id });
        
        const res_json = {
            postCount: posts.length,
            followerCount: user.follower.length,
            followingCount: user.following.length,
            creationDate: user.creationDate.toLocaleDateString([], {year: 'numeric', month: 'long', day: 'numeric'}),
        };

        console.log("res_json: ", res_json);
        res.json(res_json);
    } catch (error) {
        console.log("getUserStats failed: ", error);
        res.status(500).send("Internal Server Error");
    }
})

router.patch("/api/changeUserBio", mongoChecker, authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.bio = req.body.newBio;
        user.save()
        res.send("Successful")
    } catch (error) {
        console.log("changeUserBio: failed\n", error);
        res.status(500).send("Internal Server Error");
    }
})

router.patch("/api/changeUsername", mongoChecker, authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.username = req.body.newUsername;
        user.save()
        res.send("Successful")
    } catch (error) {
        console.log("changeUsername: failed: ", error);
        res.status(500).send("Internal Server Error");
    }
})

// export the router
module.exports = router;