const userModel = require("../../../infrastructure/database/models/User");
const bcrypt = require("bcrypt");
const config = require("../../../config/defaults");
const {createUserSchema} = require("../validations/userValidation");
const mailer = require("../../../infrastructure/libs/mailer");
const jwt = require("jsonwebtoken");
const authController = require("./auth");

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

                // creating an eamil verificationlink
                const link = `http://localhost:3000/protrack.com/api/v1/auth/verify/${user._id}/${token}`;
                
                try{
                    await mailer({email, full_name, link});
                  }catch(error){
                      throw new Error(`Your account was successfully created but we had issues sending you a welcome email`);
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