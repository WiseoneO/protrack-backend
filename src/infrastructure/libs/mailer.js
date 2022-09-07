const config = require("../../../config/defaults")

const transport = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_HOST,
    port: process.env.MAIL_TRAP_PORT,
    auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD
    }
});


const mailOptions={
                to: payload.email,
                from: 'protrack@support.com',
                subject: 'Signup Successfully!',
                html: `<h2>Welcome to PROTRACK</h2>
                        <p>Login to complete your registration <b>${newUser.firstname}</b></p>`
            };
            return transport.sendMail(mailOptions);

module.exports = { mailOptions}