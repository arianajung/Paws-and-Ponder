// Routes that involve images

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
    console.log("request files: ", req);
    // let image_array = [];
    let upload_responses = [];
    for (const file_name in req.files) {
        const upload_res = new Promise((resolve, reject) => {
            console.log(req.files[file_name].path);
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
        console.log("upload_res promise: ", upload_res);
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

// a GET route to get all images
router.get("/images", (req, res) => {
    Image.find().then(
        (images) => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        (error) => {
            res.status(500).send(error); // server error
        }
    );
});

// router.get("/images"), (req, res) => {
//     Image.findBy
// });

/// a DELETE route to remove an image by its id.
router.delete("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    // Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
    // on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {
        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then((img) => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch((error) => {
                res.status(500).send(); // server error, could not delete.
            });
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
