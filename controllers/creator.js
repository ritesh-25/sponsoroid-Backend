const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const Creator = require("../models/creator");
const HttpError = require("../utils/HttpError");
const upload = require("../config/multer");
// const HttpError = require("../utils/HttpError");

const register = async (req, res, next) => {
    let {
        name,
        email,
        instaLink,
        youtubeLink,
        password,
        TypeofContent,
        descryption,
    } = req.body;
    let avatar = req.file;
    if (!avatar) {
        return res.status(400).json({ message: "Avatar file is required." });
    }

    console.log(avatar);
    let user = await Creator.findOne({ email: email });
    if (user)
    return next(new HttpError("User already exists", 422));

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) return res.send(err);
            else {
                let user = new Creator({
                    name,
                    email,
                    instaLink,
                    youtubeLink,
                    password: hash,
                    TypeofContent,
                    descryption,
                    avatar:avatar.filename
                });
                console.log(user);
                user.save();
                let token = jwt.sign({ UserId: user._id,  userType:"creator" }, process.env.JWT_KEY);
                res.status(200).json({
                    status: "Success",
                    message: "Registered successfully",
                    token: token,
                    user: user,
                });

            }
        });
    });

}

const login = async (req, res, next) => {
    let { email, password } = req.body;
    let user = await Creator.findOne({ email: email });
    if (!user)
        return next(new HttpError("Invalid email or password", 401));

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ UserId: user._id,userType:"creator" }, process.env.JWT_KEY);
            return res.status(200).json({
                Token: token,
                User: user,
            });
        }
        else
            return next(new HttpError("Invalid email or password", 401));
    });

}

const getAll = async (req, res, next) => {
    let users;
    try {
        users = await Creator.find({}, '-password');
    } catch (error) {
        return next(new HttpError("users not found", 404));
    }
    res.json(users);
}

const getSingle = async (req, res, next) => {
    const creatorId = req.params.id;  
    console.log(creatorId);
    let creator;
    try {
        creator = await Creator.findById(creatorId, '-password');  
        if (!creator) {
            return next(new HttpError("Creator not found", 404));  
        }
    } catch (error) {
        return next(new HttpError("Something went wrong, could not retrieve creator", 500));
    }
    res.json(creator);  
}
exports.register = register;
exports.login = login;
exports.getAll = getAll;
exports.getSingle = getSingle;

