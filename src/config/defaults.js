const dotenv = require("dotenv");
dotenv.config()

const config = {
    port : process.env.PORT || 6000,
    localMongod : process.env.MONGODB_LOCAL_CONNECTION,
    env : process.env.NODE_ENV,
    projectName : process.env.PROJECT_NAME,

    // JWT
    userSecrete : process.env.USER_JWT_SECRET_KEY,
    
    // email
    emailHost : process.env.MAIL_TRAP_HOST,
    emailPort : process.env.MAIL_TRAP_PORT,
    mailuserid : process.env.MAIL_TRAP_USER,
    mailPassword : process.env.MAIL_TRAP_PASSWORD
}


module.exports = config