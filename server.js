"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require("path");

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false); // for some deprecation issues

// Refer to the below link to study middle ware and session setups.
// https://github.com/csc309-fall-2020/react-express-authentication/blob/master/server.js

const { User } = require("./models/user");
const { Comment, Post } = require("./models/post");
const { Image } = require("./models/image");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'ddgs1ughh',
    api_key: '349627335224938',
    api_secret: 'bppS8HO_P8rQO6vy5slZfXjDTdI'
});



// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

function isMongoError(error) {
    // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return (
        typeof error === "object" &&
        error !== null &&
        error.name === "MongoNetworkError"
    );
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log("Issue with mongoose connection");
        res.status(500).send("Internal server error");
        return;
    } else {
        next();
    }
};

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user_id) {
        User.findById(req.session.user_id)
            .then((user) => {
                if (!user) {
                    return Promise.reject();
                } else {
                    req.user = user;
                    next();
                }
            })
            .catch((error) => {
                res.status(401).send("Unauthorized");
            });
    } else {
        res.status(401).send("Unauthorized");
    }
}

/*** Image API Routes below ************************************/

// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    console.log("request files: ", req.files);
    // let image_array = [];
    let upload_responses = [];
    for (const file_name in req.files) {
        const upload_res = new Promise((resolve, reject) => {
            console.log(req.files[file_name].path);
            cloudinary.uploader.upload(req.files[file_name].path, function (result, error) {
                if (error) {
                    console.log("error from upload: ", error);
                    reject(error);
                } else {
                    const image = new Image({
                        image_id: result.public_id,
                        image_url: result.url,
                        created_at: new Date(),
                    });
                    image.save().then((save_res) => {
                        //image_array.push(save_res);
                        console.log("resolve from upload: ", save_res);
                        resolve(save_res);
                    },
                    (error) => {
                        res.status(500).send("POST /images: Internal Server Error", error);
                    }); 
                }
            })
        })
        console.log("upload_res promise: ", upload_res);
        upload_responses.push(upload_res);
    }

    Promise.all(upload_responses).then((result) => {
        console.log(result);
        res.send({ result });
    }).catch((error) => {
        console.log("error from promise.all: ", error);
    })
    // cloudinary.uploader.upload(
    //     req.files.file.path, // req.files contains uploaded files
    //     function (result) {

    //         // Create a new image using the Image mongoose model
    //         var img = new Image({
    //             image_id: result.public_id, // image id on cloudinary server
    //             image_url: result.url, // image url on cloudinary server
    //             created_at: new Date(),
    //         });

    //         // Save image to the database
    //         img.save().then(
    //             saveRes => {
    //                 console.log(saveRes);
    //                 res.send(saveRes);
    //             },
    //             error => {
    //                 res.status(400).send(error); // 400 for bad request
    //             }
    //         );
    //     });
});

// a GET route to get all images
app.get("/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

// app.get("/images"), (req, res) => {
//     Image.findBy
// });

/// a DELETE route to remove an image by its id.
app.delete("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {

        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});


// Middleware for verifying Admin permission of resources
const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

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

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    log(username, password);
    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then((user) => {
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
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send();
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (req.session.user_id) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
});

/*** API Routes below ************************************/
// User API Route
// a post route to *create* a User
app.post("/api/addUser", mongoChecker, async (req, res) => {
    log(`Adding User ${req.body.username}`);

    // Create a new user using the User mongoose model
    const user = new User({
        username: req.body.username,
        role: "user",
        password: req.body.password, // need to hash this
        profileImg: req.body.profileImg,
        following: [],
        follower: [],
        bookmarks: [],
        bio: req.body.bio,
    });

    // Save user to the database
    // async-await version:
    try {
        const result = await user.save();
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

app.post("/api/addComment", mongoChecker, authenticate, async (req, res) => {
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

app.get("/api/getUserPosts", mongoChecker, authenticate, async (req, res) => {
    try {
        const posts = await Post.find({ owner_id: req.user._id }).sort({
            timeStamp: -1,
        }); // returns posts sorted by latest
        res.send({ posts });
    } catch (error) {
        log(error);
        res.status(500).send("getUserPosts: Internal Server Error");
    }
});

//  returns an array containing all posts by the user given
//  request: { username: <username> }
//  response: [ {post1}, {post2}, {etc} ]
app.get(
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
app.get(
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

app.get("/api/followers", mongoChecker, authenticate, async (req, res) => {
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

app.get("/api/following", mongoChecker, authenticate, async (req, res) => {
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

app.get("/api/user", mongoChecker, authenticate, async (req, res) => {
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

app.patch("/api/followers:id", mongoChecker, async (req, res) => {
    const id = req.params.id;

    // Good practise: Validate id immediately.
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Resource not found"); // if invalid id, definitely can't find resource, 404.
        return; // so that we don't run the rest of the handler.
    }

    try {
        const user = await User.findById(id).populate("follower");
        if (!user.follower) {
            res.status(404).send("Resource not found"); // could not find this restaurant
        } else {
            user.follower = req.body.follower;
            const result = await user.save();
            res.send(result);
        }
    } catch (error) {
        log(error); // log server error to the console, not to the client.
        if (isMongoError(error)) {
            // check for if mongo server suddenly disconnected before this request.
            res.status(500).send("Internal server error");
        } else {
            res.status(400).send("Bad Request"); // bad request for changing the reservation.
        }
    }
});

app.patch("/api/following", mongoChecker, authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("following");
        if (!user.following) {
            res.status(404).send("Resource not found");
        } else {
            user.following = req.body.following;
            const result = await user.save();
            res.send(result);
        }
    } catch (error) {
        log(error); // log server error to the console, not to the client.
        if (isMongoError(error)) {
            // check for if mongo server suddenly disconnected before this request.
            res.status(500).send("Internal server error");
        } else {
            res.status(400).send("Bad Request"); // bad request for changing the reservation.
        }
    }
});

app.patch(
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

app.post("/api/makePost", mongoChecker, authenticate, async (req, res) => {
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

app.delete(
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
            } else if (!removedPost.owner_id.equals(req.user._id) && req.user.role !== "admin") {
                res.status(401).send("Unauthorized");
            }
            else {
                await removedPost.delete()
                res.send(removedPost);
            }
        } catch (error) {
            log(error);
            res.status(500).send(); // server error, could not delete.
        }
    }
);

app.delete(
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
                const comment = foundPost.comments.id(commentID)
                console.log(comment)
                if (!comment) {
                    res.status(404).send("Comment not found");
                } else if (!comment.owner_id.equals(req.user._id) && req.user.role !== "admin") {
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

// ********************* Admin APIs **********************************
// if any



// ********************* API Routes End Here **********************************

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/main", "/signup", "/blog", "/settings", "/bookmarks", "/profile"];
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
