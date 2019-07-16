const express = require('express');
const controller = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', controller.signin);

router.post('/signup', controller.signup);

module.exports = router;
