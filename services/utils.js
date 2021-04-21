const nodemailer = require("nodemailer");
module.exports = {
  Email: {
    newTransporter: () => {
       return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        name: process.env.EMAIL_HOST,
        maxConnections: 3,
        pool: true,
        port: process.env.EMAIL_PORT,
        tls: {
        //   rejectUnauthorized: false,
          ciphers:'SSLv3'
        },
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PW
        }
      });
    }
 },

 ReqBodyEval: {
  stringNotEmpty: (string) => {
    const trimmedString = `${string}`.trim();
    if (trimmedString && !(trimmedString === '')) {
      return true;
    };
    return false;
  }, 
 }

}