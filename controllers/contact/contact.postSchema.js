require('fastest-validator');
const re = /^[\p{L}\p{M}'\- ]*[\p{L}\p{M}'-]*$/iug       //accept all letters and marks from all dialects with hyphens, dashes, and in the case of the first [] capture group, arbitrary spaces.
// const re = /^[a-zA-Z'\- ]*([a-zA-Z'\- ]*)+[ ]*$/i;
const validationSchema = {
    firstName: {
      type: "string", 
      pattern: re,
      min: 1, 
      max: 60,
      messages: {
        stringPattern: "First name should only contain letters, apostophes, and/or hyphens",
        stringMin: "Name Fields should contain alpha input of at least one character",
        stringMax: "Name Fields shouldn't exceed 60 characters. If that's your real name, my apologies for imposing the cutoff"
      }
    },
    lastName: { 
      type: "string", 
      pattern: re,
      min: 1, 
      max: 60,
      messages: {
        stringPattern: "Last name should only contain letters, apostophes, and/or hyphens",
        stringMin: "Name Fields should contain alpha input of at least one character",
        stringMax: "Name Fields shouldn't exceed 60 characters. If that's your real name, my apologies for imposing the cutoff"
      }
    },
    email: {
      type: "email",
      emailMax: 254,
      messages: {
        emailMax: "E-mail field shouldn't exceed 254 characters"
      }
    },
    companyName: {
        // $$root: true,
        // trim: true,
        type: "string",
        empty: true,
        optional: true
    },
    message: { 
      type: "string", 
      min: 1, 
      max: 5000,
      messages: {
        stringMin: "Message field should not be empty",
        stringMax: "Sorry, there's a 5000 character limit set on the message field"
      }
    },
    messageHtml: { 
      type: "string", 
      min: 1,
      max: 5200,
      messages: {
        stringMin: "Message field should not be empty",
        stringMax: "Sorry, there's a 5200 character limit set on the message fields' rendered html"
      } 
    }
};

module.exports = validationSchema;