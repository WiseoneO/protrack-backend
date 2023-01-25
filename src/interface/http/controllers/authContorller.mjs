import userModel from "../../../infrastructure/database/models/User.mjs";
import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken
import { compare, hash } from "bcrypt";
import config from "../../../config/defaults.mjs";
import { passwordReset } from "../../../infrastructure/libs/mailer.mjs";
import { signInValidation, forgotPasswordValidation, validateEmailSchema} from "../validations/userValidation.mjs";


export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const {error} = signInValidation(req.body);
        if(error){
            return res.status(401).json({
                success : false,
                message : error.details[0].message
            });
        }
        //check if user is registered
        const user = await userModel.findOne({
            email: email
        });

        if(!user) return res.status(404).json({
            success : false,
            message : `Invalid credentials`
        });

        if(user.isDeleted == true) return res
        .status(403)
        .json({
            success : false,
            message : `Your account has been suspended.`
        });

        // Verify user's password
        const validPass = await compare(password, user.password);
        if(!validPass) throw new Error('Your email or password in incorrect');

        // generate jwt token
        const token = sign({
            _id: user._id,
            fullName: user.full_name,
            email: user.email,
            subscription: user.subscription,
            isDeleted: user.isDeleted
        }, config.userSecret);

        return res.status(200)
        .json({
            success : true,
            msg: 'Login successful',
            data : {token, user},
        });
    }catch(error){
        if (error instanceof Error) {
            res
              .status(500)
              .json({ success: false, msg: `${error.message}` });
          }
    }
}

export const verifyToken = async (req, res)=>{
    try{
        const userId = req.params.id;
        const token = req.params.token;

        const user = await userModel.findOne({
            _id : userId,
            isDeleted : false
        },
        {password : 0}
        );

        if(!user) return res.status(404).json({
            success : false,
            message : `User not found`
        });

        const secret = config.userEmailSecret;
        const verifyToken = verify(token, `${secret}`);
        if (!verifyToken) return res.status(400).json({
            success : false,
            message : `Verification failed!`
        });

        user.isVerified = true;

        await user.save();

        res.status(200).json({
            success: true,
            msg: `Email Verification Successful`,
            data: user,
        });
    }catch(error){
        if (error instanceof Error) {
            res.status(500)
              .json({ success: false, msg: `${error.message}` });
          }
    }
    

}

export const  sendPasswordLink = async (req, res)=>{
    try{
        //validating email 
        const {error} = validateEmailSchema(req.body);
        if(error){
            return res.status(401).json({
                success : false,
                message : error.details[0].message
            });
        }
        const email = req.body;

        const user = await userModel.findOne(email,{password : 0});
        if(!user) return res.status(404).json({
            success : false,
            msg : `User not found`
        });

        // creating a reset token
        const secret = config.userReset + user.password;
        const payload = {
            email : user.email,
            id: user._id,
        };
        const token = sign(payload, secret, {expiresIn: "10m"});

        // creating a reset link
        const link = `http://localhost:3000/api/v1/auth/user/reset/${user._id}/${token}`;

        // send mail
            await passwordReset(user.email, user.full_name, link );
            delete user._doc.password;

            res.status(200).json({
                success : true,
                msg: "Password reset link sent",
                token: token,
                user : user
            })
          
    }catch(error){
        if(error){
            return res.status(401).json({
                success : false,
                message : error.message
            });
        }
    }


}

export const resetUserPassword = async (req, res)=>{
    try{
        const {newPassword, confirmPassword} = req.body;
        const userId = req.params.id;
        const token = req.params.token;

        // Schema Validation
        const {error} = forgotPasswordValidation({
            newPassword,
            confirmPassword
        });
        if(error){
            return res.status(401).json({
                success : false,
                message : error.details[0].message
            });
        }

        // check for existing user
        const user = await userModel.findOne({_id: userId}, {password : 0});
        if(!user) return res.status(404).json({
            success : false,
            msg : `User not found`
        });

        // verifying reset token
        const secret = config.userReset + user.password;
        const payload = verify(token, secret);
        if(!payload) return res.status(403).json({
            success : false,
            msg : `Invalid token`
        });

        // hashing newPassword and changing the password to the new Password
        user.password = await hash(newPassword, 12);
        
        await user.save();
        delete user._doc.password;
          res.status(200).json({
            success : true,
            msg: `Reset Password Successful`,
            data: user        
        });
    }catch(error){
        if (error instanceof Error) {
            res.status(500)
            .json({ success: false, msg: `${error.message}` });
        } 
    }
}


