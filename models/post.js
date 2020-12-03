// Schema Attempt for Comments
const CommentSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },
    timeStamp: { type: Date, default: Date.now }, // ?
    textContent: String,
});

// Schema Attempt for Posts
const PostSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },
    timeStamp: { type: Date, default: Date.now }, // ?
    textContent: String,
    images: [], //Change this to array of image id
    likes: Number,
    comments: [CommentSchema], // ?
});

// May require an export, not sure