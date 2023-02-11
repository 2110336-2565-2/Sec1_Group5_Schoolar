const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { resetPassword, sendEmailResetPassword } = require('../controllers/resetPassword.controller')
const verifyJWT = require('../middleware/verifyJWT')

// update password
router.put('/password', resetPassword)

// sending email , change calling name later
router.post('/email', sendEmailResetPassword)

module.exports = router