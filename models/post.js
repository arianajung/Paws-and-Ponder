const mongoose = require('mongoose')

const { ObjectID } = require("mongodb");

// Schema Attempt for Comments
const CommentSchema = new mongoose.Schema({
    owner: { type: ObjectID, ref: 'User' },
    timeStamp: { type: Date, default: Date.now }, // ?
    textContent: String,
});

// Schema Attempt for Posts
const PostSchema = new mongoose.Schema({
    owner: { type: ObjectID, ref: 'User' },
    timeStamp: { type: Date, default: Date.now }, // ?
    textContent: String,
    images: [], //Change this to array of image id
    likes: Number,
    comments: [CommentSchema], // ?
    tags: [String],
});

const Post = mongoose.model('Post', PostSchema)
module.exports = { Post }
