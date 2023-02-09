const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { resetPassword, sendEmailResetPassword } = require('../controllers/resetPassword.controller')
const verifyJWT = require('../middleware/verifyJWT')

// update password
router.put(verifyJWT, resetPassword)

// sending email , change call name later
router.get(verifyJWT, sendEmailResetPassword)

module.exports = router