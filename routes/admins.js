// Routes that involve admins
const log = console.log;

// express
const express = require("express");
const router = express.Router(); // Express Router

const { User } = require("../models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// helpers
const { mongoChecker } = require("./helpers/mongo_helpers");
const { authenticate, isAdmin } = require("./helpers/authentication");

// Ban/Unban a user
router.patch(
    "/api/admin/toggleBanStatus/:user_id",
    mongoChecker,
    authenticate,
    isAdmin,
    async (req, res) => {
        const user_id = req.params.user_id;
        // Validate id
        if (!ObjectID.isValid(user_id)) {
            res.status(404).send("Post not found");
            return;
        }
        try {
            const user = await User.findById(user_id);
            if (!user) {
                res.status(404).send("User not found");
            } else {
                // check if status exists
                if (!user.status || user.status == "normal") {
                    user.status = "banned";
                } else {
                    user.status = "normal";
                }
                await user.save();
                res.send({
                    message: `You have set the status of the user with name ${user.username} to ${user.status}`,
                    username: user.username,
                    status: user.status,
                });
            }
        } catch (error) {
            log(error);
            res.status(500).send(); // server error, could not delete.
        }
    }
);

// export the router
module.exports = router;
