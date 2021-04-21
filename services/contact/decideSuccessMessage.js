const {ReqBodyEval} = require("../utils")

const decideSuccessMessage = (reqBodyObj) => {
  const {firstName, lastName, email, companyName} = reqBodyObj;
  const companyNameTrim = `${companyName}`.trim();
  
  function decide() {
    return ReqBodyEval.stringNotEmpty(companyName)
      ? `Hello ${firstName} and hello to all the other fine folks over at ${companyNameTrim}`
      : `Hello ${firstName + ' ' + lastName}`;
  };
  
  return {
    success: true, 
    message: `${decide()}! Thanks for the show of interest! You should receive an e-mail in your inbox at ${email} shortly.`
  };
}

module.exports = {
  decideSuccessMessage
}