const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// verify the token
const verifyToken = async(req, res, next)=>{
    const authHeader = req.headers.token;

    // check if user is authenticated
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            success : false,
            message : "Access Denied!"
        })
    }

    try{
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) res.status(403).json({errorMessage : "Token is invalid"});
            req.user = user;
            next();
        })
    }catch(error){
        next(error)
    }
}

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id = req.params.id || req.user.isAdmin){
            next()
        }else {
            res.status(403).json({errorMessage : "You are not allowed to do that!"});
          }
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
          res.status(403).json({message : "You are not alowed to do that!"});
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin}