const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createError = require("http-errors")
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config()

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

        // encrypting the passwor
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

// LOGIN
exports.login = async(req, res, next)=>{
    try{
        const user = await User.findOne({email : req.body.email}).select("+password");
        if(!user){
            return res.status(404).json({
                success : false,
                message: "Invalid credentials"
            });
        }

        const matchedPassword = await bcrypt.compare(req.body.password, user.password);
        if(!matchedPassword){
            return res.status(400).json({
                success : false,
                message: "Invalid credentials"
            });
        }

        const accesstoken = jwt.sign({id: user._id, email : user.email, firstname : user.firstname, isAdmin : user.isAdmin }, process.env.JWT_SECRET_KEY,{expiresIn: `1d`});

        // reassigning the created token 
        user.accessToken = accesstoken;
            await user.save();

        res.status(200).json({
            success : true,
            token : accesstoken
        })
       
    }catch(error){
        next(error)
    }
}