const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    linked: String,
    twitter: String,
    TypeofContent: String,
    Descryption: String,
    avatar: String
});

module.exports = mongoose.model("company",companySchema);