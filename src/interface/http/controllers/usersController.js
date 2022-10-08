const userModel = require("../../../infrastructure/database/models/user");
const bcrypt = require("bcrypt");
const config = require("../../../config/defaults");
const {createUserSchema} = require("../validations/userValidation");
const {sendWelcomeMail} = require("../../../infrastructure/libs/mailer");
const cloudinary = require("../../../infrastructure/libs/cloudinary");
const isValidObjectId = require("../utils/isValidObjectId")
// const fs = require("fs");
const {path} = require("path");
const jwt = require("jsonwebtoken");

exports.signupUser = async (req, res)=>{
        try{
            let {
                full_name,
                phoneNumber: {phoneNo, countryCode},
                email,
                password ,
                } = req.body;

                // validating inputs
                const {error} = createUserSchema(req.body);
                if(error){
                    return res.status(400).json({
                        success : false,
                        message : error.details[0].message
                    });
                }
    
                // check if user exist
                let isUser = await userModel.findOne({email :email});
                if(isUser) throw new Error(`User with this email already exist`);

                // hash Password
                let hashedPassword = await bcrypt.hash(password, 12);
                password = hashedPassword;

                let user = await userModel.create({
                    full_name,
                    phoneNumber: {phoneNo, countryCode},
                    email,
                    password,
                });
                
                // creating an email verification token
                const secret = config.userEmailSecret;
                const token = jwt.sign({email: user.email}, `${secret}`, {
                    expiresIn: "1d"
                });

                // console.log(token)

                // creating an eamil verificationlink
                const link = `http://localhost:3000/protrack.com/api/v1/auth/verify/${user._id}/${token}`;
                try{
                   await sendWelcomeMail(email, full_name, link);
                }catch(error){
                    throw new Error(`ac`)
                }
                  

            await user.save();
            delete user._doc.password;
            return res.status(201).json({
                success : true,
                msg: 'User created successfully. Message',
                data: user,
            });
        }catch(error){
            if (error instanceof Error) {
                res
                  .status(500)
                  .json({ success: false, msg: `${error}` });
              }
    }   
}

// changePassword
exports.changePassword = async (req, res)=>{
    try{
        const userId = req.user._id;
        console.log(userId);

        let {oldPassword, newPassword} = req.body;

        const user = await userModel.findOne({
                _id : userId,
                isDeleted : false,
            })
            // console.log(user);
            if(!user) throw new Error(`User not found`);
    
            // compare oldpassword
            let verifyPassword = await bcrypt.compare(oldPassword, user.password);
            if(!verifyPassword) throw new Error (`Password is incorrect!`);

            let ChangedPassword = await bcrypt.hash(newPassword, 12);
            user.password = ChangedPassword;

            await user.save();
            res.status(200).json({
                success: true,
                msg: `Password updated successfully!`,
                // data: user,
              });

    }catch(error){
        if (error instanceof Error) {
            res
              .status(500)
              .json({ success: false, msg: `${error}` });
          }
        }
}

// create team
exports.createTeam = async (req, res)=>{
    try{
        const userId = req.params.id;
        const currentUser = await userModel.findById({_id : req.user._id});
        try{
            if(!currentUser.team.includes(userId)){
                const userCheck = await userModel.findOne({_id : userId});
                if(!userCheck) throw new Error (`User not found`);
                if(userId === currentUser) throw new Error (`Not allowed `);
                await currentUser.updateOne({$push: {team: userId}});
                // await userCheck.updateOne({$push: {team: currentUser.id}});
                res.status(200).json({
                    success: true,
                    msg: `Added successfully!`,
                    data: currentUser,
                  });
            }else{
            throw new Error(`Already a team member`);
            }
        }catch(error){
            throw error;
        }
    }catch(error){
        if (error instanceof Error) {
            res
            .status(500)
            .json({ success: false, msg: `${error}` });
        }
    }
}