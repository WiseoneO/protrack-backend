const jwt = require("jsonwebtoken");
const config = require("../../../config/defaults")

// verify the token
const verifyToken = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
         res.status(401).json({
            success : false,
            message : "Access Denied!"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const verified =  jwt.verify(token, config.userSecret)
            req.user = verified;
            next();

    }catch(error){
        if (error instanceof Error) {
      res
        .status(401)
        .json({ success: false, msg: `${error.message}` });
      throw new Error(`${error.message}`);
    }
    throw error;
    }
}

// const verifyTokenAndAuthorization = (req, res, next)=>{
//     verifyToken(req, res, ()=>{
//         if(req.user.id = req.params.id || req.user.isAdmin){
//             next()
//         }else {
//             res.status(403).json({errorMessage : "You are not allowed to do that!"});
//           }
//     })
// }

// const verifyTokenAndAdmin = (req, res, next)=>{
//     verifyToken(req, res, ()=>{
//         if(req.user.isAdmin){
//             next()
//         }else{
//           res.status(403).json({message : "You are not alowed to do that!"});
//         }
//     })
// }

module.exports = verifyToken;