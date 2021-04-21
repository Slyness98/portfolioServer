const schema = require('./schemas/contactForm.schema');
const DOMPurify = require('isomorphic-dompurify');
const Validator = require("fastest-validator");
const rateLimit = require('express-rate-limit');


const validate = (req, res, next) => {
    const {firstName, lastName, email, companyName, message, messageHtml} = req.body.current;
    DOMPurify.sanitize(messageHtml);
    const obj = {
      firstName: firstName,
      lastName: lastName, 
      email: email, 
      companyName: `${companyName}`.trim(),
      message: message, 
      messageHtml: messageHtml
    }
    const v = new Validator();
    const result = v.validate(obj, schema);
    if (!(result === true)) {
      res.status(400).send({success: false, errors: result});
      return;
    } else {
      next();
    }
}

const rateLimiter = rateLimit({
    //  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  windowMs:  60 * 1000, // 1min
  max: 3, // limit each IP to 3 email requests per window (24hrs)
  message: {
    success: false, 
    errors: [{ message: ["Sorry, but emails are limited to 3 per visitor/day for my own protection (and sanity). Hope you can understand. Feel free to reach out to me via LinkedIn or through any of the other social icons provided!"]}]
  }
});

module.exports = {
  validate,
  rateLimiter
}