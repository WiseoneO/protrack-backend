import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;
import config from "../../../config/defaults.mjs";
const { userSecret } = config
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
        const verified =  verify(token, userSecret)
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

export default verifyToken;