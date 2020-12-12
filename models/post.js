"use strict";

const mongoose = require("mongoose");

// Schema Attempt for Comments
const CommentSchema = new mongoose.Schema({
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timeStamp: { type: Date, default: Date.now },
    textContent: String,
});

// Schema Attempt for Posts
const PostSchema = new mongoose.Schema({
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timeStamp: { type: Date, default: Date.now },
    textContent: String,
    images: [], //Change this to array of image id
    likes: Number,
    comments: [CommentSchema],
    tags: [],
});

const Comment = mongoose.model("Comment", CommentSchema);
const Post = mongoose.model("Post", PostSchema);
module.exports = { Comment, Post };
