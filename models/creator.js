const mongoose = require("mongoose");

const creatorSchema = mongoose.Schema({
    name: String,
    email: String,
    instaLink: String,
    youtubeLink: String,
    password: String,
    TypeofContent: String,
    descryption: String,
    avatar: String
});

module.exports = mongoose.model("creator",creatorSchema);