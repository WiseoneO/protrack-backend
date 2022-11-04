const config = require("../../config/defaults");
const nodemailMailgun = require("nodemailer-mailgun-transport");
const nodemailer = require("nodemailer");
const logger = require("pino")();
const dotenv = require("dotenv").config();
const auth = {
  auth: {
    api_key: `${process.env.MAILGUN_API_KEY}`,
    domain: `${process.env.MAILGUN_DOMAIN}`,
  }
}


let transporter = nodemailer.createTransport(nodemailMailgun(auth));

exports.sendWelcomeMail = async (email, full_name, link)=>{
  let options = {
    from : `info-noreply@protrack.com`,
    to : `${email}`,
    subject : `Welcome`,
    text : `
    Hi ${full_name},
    
    Welcome to Protrack, please the link below to verify your account

    link: ${link}

    Regards,
    Protrack    
    `
  }

  // console.log(options.body);

  transporter.sendMail(options, (err, info)=> {
    if(err){
      logger.info(err);
    }else{
      logger.info(info)
    }
  })
}

exports.passwordReset = async (email, full_name, link)=>{
  let options = {
    from : `ogborogee@gmail.com`,
    to : `${email}`,
    subject : `Password Reset`,
    body : `
    Hi ${full_name},
    
    A password reset was requested for your account. Click on the link
    below to reset your password

    link: ${link} 

    Regards:
    Protrack    
    `
  }

  console.log(options.body)

  transporter.sendMail(options, (err, info)=> {
    if(err){
      logger.info(err.message);
    }else{
      logger.info(info)
    }
  })
}
exports.sendNewSubscriptionMail = async (email, full_name, plan, expiresIn, invoiceNumber)=>{
  let options = {
    from :'"Protrack" <protrack@example.com>', // sender address
    to : `${email}`,
    subject: 'Welcome to Protrack Premium Membership', // Subject line
    body : `
    Hi ${full_name},
    
    You have successfully subscribed for our ${plan} months plan,
    your subcription expires on ${expiresIn}
    
    Invoice Number: ${invoiceNumber}
    
    Regards:
    Nerdyeye
    `, // plain text body

      // html: `
      //       ${mail}
      // `,
  }

  logger.info('Email has been sent')

  transporter.sendMail(options, (err, info)=> {
    if(err){
      logger.info(err.message);
    }else{
      logger.info(info)
    }
  })
}