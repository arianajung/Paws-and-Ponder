// Routes that involve images
const log = console.log;

// express
const express = require("express");
const router = express.Router(); // Express Router

const { User } = require("../models/user");

// helpers
const { mongoChecker } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "ddgs1ughh",
    api_key: "349627335224938",
    api_secret: "bppS8HO_P8rQO6vy5slZfXjDTdI",
});

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

const { Image } = require("../models/image");

// a POST route to *create* an image
router.post("/images", multipartMiddleware, (req, res) => {
    // Use uploader.upload API to upload image to cloudinary server.
    // let image_array = [];
    let upload_responses = [];
    for (const file_name in req.files) {
        const upload_res = new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                req.files[file_name].path,
                function (result, error) {
                    if (error) {
                        console.log("error from upload: ", error);
                        reject(error);
                    } else {
                        resolve(result.url);
                    }
                }
            );
        });
        upload_responses.push(upload_res);
    }

    Promise.all(upload_responses)
        .then((result) => {
            console.log(result);
            res.send({ result });
        })
        .catch((error) => {
            console.log("error from promise.all: ", error);
        });
});

router.post(
    "/api/changeUserAvatar",
    mongoChecker,
    authenticate,
    multipartMiddleware,
    async (req, res) => {
        // Use uploader.upload API to upload image to cloudinary server.
        cloudinary.uploader.upload(
            req.files["file0"].path,
            async function (result, error) {
                if (error) {
                    res.status(400).send("Failed to upload to server!");
                } else {
                    const user = await User.findById(req.user._id);
                    user.profileImg = result.url;
                    user.save();
                    res.send("Successfully updated profile picture!");
                }
            }
        );
    }
);

// export the router
module.exports = router;
