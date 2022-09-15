const userModel = require("../../../infrastructure/database/models/User");
const bcrypt = require("bcrypt");
const config = require("../../../config/defaults");
const {createUserSchema} = require("../validations/userValidation");
const {sendWelcomeMail} = require("../../../infrastructure/libs/mailer");
const cloudinary = require("../../../infrastructure/libs/cloudinary");
const fs = require("fs");
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
                
                
                   await sendWelcomeMail(email, full_name, link);
                  

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


// exports.uploadAvatar = async (req, res)=>{
//     try{
//     const userId = req.params.id;
//     const payload = req.file;

//     const uploader = async (path) =>
//     cloudinary.uploads(path, 'avatar');
//       const url = [];
//       const file = payload;

//       const { path } = file;
//       const newPath = await uploader(path);

//       url = newPath.url

//     fs.unlinkSync(path);

//       const user = await userModel.findOne({ _id: userId });
//       user.avatar = url.toString();

//       await user.save();
//       delete user._doc.password;
//       res.status(200).json({
//         success: true,
//         msg: `Photo successfully uploaded`,
//         data: user,
//       });


//     }catch(error){
//         if (error instanceof Error) {
//             res
//               .status(500)
//               .json({ success: false, msg: `${error.message}` });
//           }
//     }
// }
