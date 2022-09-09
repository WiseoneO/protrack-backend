const userModel = require("../infrastructure/database/models/User");
const bcrypt = require("bcrypt");
const {createUserSchema} = require("../validations/userValidation")


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

                let hashedPassword = await bcrypt.hash(password, 12);
                password = hashedPassword;

                let user = await userModel.create({
                    full_name,
                    phoneNumber: {phoneNo, countryCode},
                    email,
                    password,
                });

            await user.save();
            delete user._doc.password;
            return res.status(201).json({
                success : true,
                msg: 'User created successfully',
                data: user
            })

        }catch(error){
            if (error instanceof Error) {
                res
                  .status(500)
                  .json({ success: false, msg: `${error.message}` });
                throw new Error(`${error.message}`);
              }
              throw error;
        }
            
    }
    
