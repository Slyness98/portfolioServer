const email = require("../../services/contact/ContactEmailService");
const response = require("../../services/contact/decideSuccessMessage");

async function processRequest(req, res) {
  await email.receiveEmail(req.body.current)
  .then(() => {
    const successMessage = response.decideSuccessMessage(req.body.current);
    res.send(successMessage);
  })
  .catch((err) => res.send( {success: false, errors: [{message: err.message}]} ));
  
  await email.autoReplyToVisitor(req.body.current)
  .catch((err) => res.send( {success: false, errors: [{message: err.message}]} ));
}


module.exports = {
  processRequest
};