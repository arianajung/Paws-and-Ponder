const UserSchema = new mongoose.Schema({
    username: String,
    role: String,
    password: String, // should be encrypted
    profileImg: String, // ?
    following: [{ type: ObjectId, ref:'User' }],
    follower: [{ type: ObjectId, ref: 'User' }],
    userPosts: [{ type: ObjectId, ref:'Post' }],
    bookmarks: [{ type: ObjectId, ref:'Post' }],
    // Unsure about the ones below
    bio: String,    
});

// May require an export, not sure