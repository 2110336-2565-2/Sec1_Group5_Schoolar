const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { resetPassword } = require('../controllers/resetPassword.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.put(verifyJWT, resetPassword)

module.exports = router