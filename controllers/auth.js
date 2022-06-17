const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createError = require("http-errors")
const bcrypt = require("bcrypt");

exports.register = async (req, res, next)=>{
    let payload = req.body;

    try{
        // check if email already exist
        let users = await User.findOne({email : payload.email});
        if(users) throw createError.Conflict(
            res.json({
                success: false,
                message:`${payload.email} already exist`
               }
            ));

        let encryptedPassword = await bcrypt.hash(payload.password, 12);
        payload.password = encryptedPassword;

        const newUser = await User.create(payload);

    res.status(201).json({
        success : true,
        data : newUser
    })
    }catch(error){
        next(error)
    }
}