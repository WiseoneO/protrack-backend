import userModel from "../../../infrastructure/database/models/User.mjs";
import { hash, compare } from "bcrypt";
import config from "../../../config/defaults.mjs";
import { createUserSchema } from "../validations/userValidation.mjs";
import { sendWelcomeMail } from "../../../infrastructure/libs/mailer.mjs";
import {uploads} from "../../../infrastructure/libs/cloudinary.mjs";
// const fs = require("fs");
import path from "path";
import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken

export const signupUser = async (req, res)=>{
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
                let hashedPassword = await hash(password, 12);
                password = hashedPassword;

                let user = await userModel.create({
                    full_name,
                    phoneNumber: {phoneNo, countryCode},
                    email,
                    password,
                });
                
                // creating an email verification token
                const secret = config.userEmailSecret;
                const token = sign({email: user.email}, `${secret}`, {
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
export const changePassword = async (req, res)=> {
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
            let verifyPassword = await compare(oldPassword, user.password);
            if(!verifyPassword) throw new Error (`Password is incorrect!`);

            let ChangedPassword = await hash(newPassword, 12);
            user.password = ChangedPassword;

            await user.save();
            res.status(200).json({
                success: true,
                msg: `Password updated successfully!`,
                // data: user,
              });

    }catch(error){
        if (error instanceof Error) {
            res.status(500)
              .json({ success: false, msg: `${error}` });
          }
        }
}

// UPDATE USER PROFILE
// exports.update = async (req, res) =>{
//     try{
//         const userId = req.params.userId;
//         const payload = req.body;
//         const query= {_id : userId}
//         try{
//             const {error} = createUserSchema(payload);
//                 if(error){
//                     return res.status(400).json({
//                         success : false,
//                         message : error.details[0].message
//                     });
//                 }
//             const verifyUser = await userModel.findByIdAndUpdate(query,payload,{new : true});
//             if(!verifyUser) throw Error ('You cant perform this operation');

//             res.status(HTTP_STATUS.StatusCodes.ACCEPTED).json({
//                 success : true,
//                 msg : 'User data updated successfully',
//                 data : verifyUser
//             });
            


//         }catch(error){
//             throw error;
//         }
//     }catch(error){
//         if(error instanceof Error){
            
//         }
//     }
// }

// soft delete User
export async function softDelete(req, res){

}

// permanet delete
export async function permanentDelete(req, res){

}

// View trash
export async function Trash(req, res){
    
}