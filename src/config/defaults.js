const dotenv = require("dotenv");
dotenv.config()

const config = {
    port : process.env.PORT || 6000,
    localMongod : process.env.MONGODB_LOCAL_CONNECTION,
    env : process.env.NODE_ENV,
    projectName : process.env.PROJECT_NAME,

    // JWT
    userSecrete : process.env.USER_JWT_SECRET_KEY,
    userEmailSecret : process.env.USER_EMAIL_VERIFICATION_SECRET,
    userReset : process.env.USER_RESET,
    
    // email
    emailHost : process.env.MAIL_TRAP_HOST,
    emailPort : process.env.MAIL_TRAP_PORT,
    mailuserid : process.env.MAIL_TRAP_USER,
    mailPassword : process.env.MAIL_TRAP_PASSWORD,

  
    // CLOUDINARY
    cloudName : process.env.CLOUD_NAME,
    cloudKey : process.env.CLOUDINARY_API_KEY,
    cloudSecret : process.env.CLOUDINARY_API_SECRET
}



module.exports = config