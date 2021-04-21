const {Email, ReqBodyEval} = require("../utils");


async function receiveEmail(reqObj) {
  const {firstName, lastName, email, companyName, message, messageHtml} = reqObj;

  const transporter = Email.newTransporter();

  const decideSubjectLine = () => {
    return ReqBodyEval.stringNotEmpty(companyName) 
      ? `Portfolio Contact - New Message from ${firstName+' '+lastName+' at '+companyName}`
      : `Portfolio Contact - New Message from ${firstName+' '+lastName}`
  }

  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: decideSubjectLine(),
    text: message, // plaintext body
    html: messageHtml // html body
  };
  
  const errMessage = `Sorry ${firstName}, your message somehow lost its way while being sent to my inbox. The host seems to have rejected it for reasons outside my control. Feel free to try contacting me via LinkedIn`;
  
  await transporter.sendMail(mailOptions)
  .catch(() => {throw new Error(`${errMessage}`)});
  
  transporter.close();
};



async function autoReplyToVisitor(reqObj) {
  const {firstName, email, message, messageHtml} = reqObj;
  
  const transporter = Email.newTransporter();
  var mailOptions = {
    from: process.env.EMAIL,//change to a new no-reply account later
    to: email,
    subject: "Auto Reply from Seth Lyness -- Portfolio Contact Form",
    text: `Hey there. Thanks for reaching out, ${firstName}! I'm gonna echo your message as a test: ${message}... I'll take a look at what you sent and follow up soon!`,
    html:`<p>Hey there. Thanks for reaching out, ${firstName}! I'm gonna echo your message as a test:</p> ${messageHtml}<p>... I'll take a look at what you sent and follow up soon!</p>`
  };

  const errMessage = `Hey there ${firstName}. It seems I received your message but something went wrong with the auto reply confirmation. I'll take a look at what you sent and be in touch soon. Thanks for your interest!`;
  
  await transporter.sendMail(mailOptions)
  .catch(() => {throw new Error(`${errMessage}`)});
  
  transporter.close();
}

module.exports = {
  receiveEmail,
  autoReplyToVisitor
}