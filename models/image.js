const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
    image_id: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    created_at: String,
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = { Image };
