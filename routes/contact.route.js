const express = require('express');
const validator = require("../middleware/Validation/validator");
const contactController = require('../controllers/contact/contact.controller');

const router = express.Router();

const {validate, rateLimiter} = validator;
router.post("/", validate, rateLimiter, (req, res) => {
    contactController.processRequest(req,res)
});

module.exports = router;