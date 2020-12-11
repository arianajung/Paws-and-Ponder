// helpers for authentication
const log = console.log;

// express
const express = require("express");
const router = express.Router(); // Express Router

const { User } = require("../../models/user");

router.get("/users/check-session", (req, res) => {
    if (req.session.user_id) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
});
module.exports = {
    // A route to check if a user is logged in on the session

    // Middleware for authentication of resources
    authenticate: (req, res, next) => {
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
    },

    // Middleware for verifying Admin permission of resources
    isAdmin: (req, res, next) => {
        if (req.user.role === "admin") {
            next();
        } else {
            res.status(401).send("Unauthorized");
        }
    },

    router,
};
