const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const Company = require("../models/company");
const HttpError = require("../utils/HttpError");

const register = async (req, res, next) => {
    let {
        name,
        email,
        password,
        linked,
        twitter,
        TypeofContent,
        Descryption,
    } = req.body;

    let avatar = req.file;

    let user = await Company.findOne({ email: email });
    if (user)
        return next(new HttpError("User already exists", 422));


    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) return next(new HttpError("Error in signing up", 500));
            else {
                let user = await Company.create({
                    name,
                    email,
                    password,
                    linked,
                    twitter,
                    TypeofContent,
                    Descryption,
                    avatar:avatar.filename
                });
                let token = jwt.sign({ UserId: user._id, userType:"company" }, process.env.JWT_KEY);
                res.status(200).json({
                    status: "Success",
                    message: "Registered companysuccessfully",
                    token: token,
                    user: user,
                });
            }
        });
    });
}

const login = async (req, res, next) => {
    let { email, password } = req.body;
    let user = await Company.findOne({ email: email });
    if (!user)
        return next(new HttpError("Invalid email or password", 401));

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ UserId: user._id, userType:"company" }, process.env.JWT_KEY);
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
    let companies;
    try {
        companies = await Company.find({},'-password');
    } catch (error) {
        return next(new HttpError("companies not found", 404));
    }
    res.json(companies);
}

const getSingle = async (req, res, next) => {
    const companyId = req.params.id;  
    console.log(companyId);
    let creator;
    try {
        creator = await Company.findById(companyId, '-password');  
        if (!creator) {
            return next(new HttpError("Company not found", 404));  
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