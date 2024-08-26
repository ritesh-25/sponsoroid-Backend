const jwt = require('jsonwebtoken');
const HttpError =require("../utils/HttpError");
const Creator = require("../models/creator");
const checkAuth = async (req,res,next)=>{
    let token = req.cookies.token;
    if(!token)
        return next(new HttpError("Unauthorized",401));
    try{
     let decode = jwt.verify(req.cookies.token,process.env.JWT_KEY);
     let user = Creator.findOne({email:decode.email}).select("-password");
     req.user = user;
     next();
    }
    catch{
        return next(new HttpError("Authorization failed",403));
    }
}

exports.checkAuth = checkAuth;