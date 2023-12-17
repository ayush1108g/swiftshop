const nodemailer = require('nodemailer');
  const sendmail =async options => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        
        auth: {
          user: "guptasagar87190@gmail.com",
          pass: "srmdzeclngncttql"
        }
      });
      const mailoptions = {
        from: 'medical@gmail.com',
        to: options.email,
        subject:options.subject,
        text: options.message,
      }
    await  transporter.sendMail(mailoptions);
  }
module.exports = sendmail;
