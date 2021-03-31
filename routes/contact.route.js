const express = require('express');
const contactController = require('../controllers/contact/contact.controller');

const router = express.Router();

router.post("/", contactController.validate, contactController.limiter, (req, res) => {
  contactController.receiveMessage(req,res)
});

module.exports = router;