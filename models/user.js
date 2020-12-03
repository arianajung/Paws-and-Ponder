const mongoose = require('mongoose')
// to validate object IDs
const { ObjectID } = require("mongodb");

// Add validator annd bcrypt here

const UserSchema = new mongoose.Schema({
    username: String,
    role: String,
    password: String, // should be encrypted
    profileImg: String, // ?
    following: [{ type: ObjectID, ref:'User' }],
    follower: [{ type: ObjectID, ref: 'User' }],
    userPosts: [{ type: ObjectID, ref:'Post' }],
    bookmarks: [{ type: ObjectID, ref:'Post' }],
    // Unsure about the ones below
    bio: String,    
});

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }