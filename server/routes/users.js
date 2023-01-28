const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { register } = require('../controllers/users')

router.post(
	'/register',
	[
		body('username')
			.isLength({ min: 1 })
			.withMessage('Username must not empty')
			.isLength({ max: 40 })
			.withMessage('Username is too long')
			.matches(/^[a-zA-Z0-9._-]*$/)
			.withMessage('Username contain invalid charactor'),
		body('password')
			.isLength({ min: 8 })
			.withMessage('Password must be at least 8 characters')
			.isLength({ max: 40 })
			.withMessage('Passwords must be at most 40 characters')
			.matches(/(?=.*\d)(?=.*[A-Z])/)
			.withMessage('Passwords must have at least one uppercase and one digit number'),
		body('email').isEmail().withMessage('Email is invalid'),
	],
	register,
)

module.exports = router
