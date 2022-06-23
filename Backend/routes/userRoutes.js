const express = require('express');
const { registerUser } = require('../controller/userController');
const { authUser } = require('../controller/userController');

const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(authUser)

module.exports = router;