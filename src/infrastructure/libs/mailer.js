const config = require("../../config/defaults")
const nodemailMailgun = require("nodemailer-mailgun-transport");
const nodemailer = require("nodemailer");
const logger = require("pino")();

const mailer = async (email, full_name, link)=>{

    var transporter = nodemailer.createTransport({
        host: `${config.emailHost}`,
        port: config.emailPort,
        auth: {
          user: config.mailuserid,
          pass: config.mailPassword
        }
      });

      transporter.verify(function(error, success) {
        if (error){
             logger.info(error.message);
        } else{
             logger.info(success);
        }
     });
    
      const mailOptions = {
        
        from: '"Protrack" <protrack.com>', // sender address
        to: `${email}`, // list of receivers,
        subject: 'Welcome to Protrack',
        text: `
        Hi ${full_name},
        
        It is with great honor and privilege we welcome you. Below are your login credentials.
    
        Email: ${email}
        
        Click on the link below to verify your account
        
        link: ${link}
        `
      }
       transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
             logger.info(error)
        }
        logger.info(`Message Sent`);
      })

}

module.exports = mailer;

    

  


 