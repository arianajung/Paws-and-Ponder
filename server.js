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

const { User } = require("./models/user");
const { Post, Comment } = require("./models/post");
const { Image } = require("./models/image");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}


/*** API Routes below ************************************/
// User API Route
// a post route to *create* a User
app.post('/api/addUser', mongoChecker, async (req, res) => {
    log(`Adding User ${req.body.username}`)

    // Create a new user using the User mongoose model
    const user = new User({
        username: req.body.username,
        role: req.body.role,
        password: req.body.password, // need to hash this
        profileImg: req.body.profileImg,
        following: [],
        follower: [],
        userPosts: [],
        bookmarks: [],
        bio: req.body.bio
    })

    // Save user to the database
    // async-await version:
    try {
        const result = await user.save() 
        res.send(result)
    } catch(error) {
        log(error) // log server error to the console, not to the client.
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
        }
    }
})

app.post('/api/addComment', mongoChecker, async (req, res) => {
    const new_comment = new Comment({
        owner_id: req.user._id,
        owner: req.user.username,
        textContent: req.body.textContent,
    });
    try {
        const post = await Post.findById(req.body.post_id);
        post.comments.push(new_comment);
        await post.save();
        res.send(`Comment for post ${req.body.post_id} made by ${req.user._id}: ${req.body.textContent}`);
    } catch (error) {
        log(error);
        res.status(500).send("addComment: Internal Server Error")
    }
})

app.get('/api/getUserPosts', mongoChecker, async (req, res) => {
    try {
        const posts = await Post.find().populate({
            path: 'owner_id', 
            match: { owner_id: req.user._id },
            sort: { timeStamp: -1 }
        }); // returns posts sorted by latest
        res.send(posts);
    } catch (error) {
        log(error);
        res.status(500).send("getUserPosts: Internal Server Error");
    }
})


//  returns an array containing all posts by the user given
//  request: { username: <username> }
//  response: [ {post1}, {post2}, {etc} ]
app.get('/api/getProfilePosts', mongoChecker, async (req, res) => {
    const user_id = User.findByUsername(req.query.username);
    try {
        const posts = await Post.find().populate({
            path: 'owner_id', 
            match: { owner_id: user_id },
            sort: { timeStamp: -1 }
        }); // returns posts sorted by latest
        res.send(posts);
    } catch (error) {
        log(error);
        res.status(500).send("getProfilePosts: Internal Server Error");
    }
})

// ********************* API Routes End Here **********************************

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