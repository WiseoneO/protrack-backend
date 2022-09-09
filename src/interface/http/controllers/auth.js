const userModel = require("../../../infrastructure/database/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../../../config/defaults");
const {signInValidation} = require("../validations/userValidation")


exports.login = async (req, res) =>{
    try{
        const {email, password} = req.body;
        const {error} = signInValidation(req.body);
        if(error){
            return res.status(400).json({
                success : false,
                message : error.details[0].message
            });
        }

        //check if user is registered
        const user = await userModel.findOne({
            email: email,
            isDeleted : false
        });

        if(!user) throw new Error ('Your email or password is incorrect');

        if(user.isDeleted == true) 
        throw new Error ('Your account has been suspended.')

        // Verify user's password
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) throw new Error('Your email or password in incorrect');

        // generate jwt token
        const token = jwt.sign({
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            subscription: user.subscription,
            isDeleted: user.isDeleted
        }, config.userSecrete);

        res.status(200)
        // .header('auth-token', token)
        .json({
            success : true,
            msg: 'successfully logged in',
            data : {token, user},
        })


    }catch(error){
        if (error instanceof Error) {
            res
              .status(500)
              .json({ success: false, msg: `${error.message}` });
          }
    }
    
}



