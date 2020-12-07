const mongoose = require("mongoose");
// to validate object IDs
const { ObjectID } = require("mongodb");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    role: String,
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    profileImg: String, // ?
    following: [{ type: ObjectID, ref: "User" }],
    follower: [{ type: ObjectID, ref: "User" }],
    bookmarks: [{ type: ObjectID, ref: "Post" }],
    // Unsure about the ones below
    status: String,
    bio: String,
});

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre("save", function (next) {
    const user = this; // binds this to User document instance

    // checks to ensure we don't hash password more than once
    if (user.isModified("password")) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function (username, password) {
    const User = this; // binds this to the User model

    // First find the user by their username
    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject(); // a rejected promise
        }
        // if the user exists, make sure their password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

// A static method to the User model that returns the ObjectID of a user
// given the username 
UserSchema.statics.findByUsername = function (username) {
	const User = this; 
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject();
		} else {
			return Promise.resolve(user._id);
		}
	})
}

// make a model using the User schema
const User = mongoose.model("User", UserSchema);
module.exports = { User };
