const eventEmitter = require('./evenEmitter');
const nodemailer = require("nodemailer");

module.exports = () => {
    eventEmitter.on("send_email", async (emailData) => {



        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });


          let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            ... emailData
          });
       

    });
};