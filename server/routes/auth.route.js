const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { register, login, refreshToken } = require('../controllers/auth.controller')

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
			.matches(/(?=.*\d)/)
			.withMessage('Passwords must have at least one digit number')
			.matches(/(?=.*[A-Z])/)
			.withMessage('Passwords must have at least one uppercase letter')
			.matches(/^\S*$/)
			.withMessage('Passwords must not contain spaces'),
		body('email').isEmail().withMessage('Email is invalid'),
		body('role').isIn(['student', 'provider', 'admin']).withMessage('Role is invalid'),
		body('phoneNumber').notEmpty().withMessage('Please enter phone number'),
	],
	register,
)

router.post(
	'/login',
	[
		body('username').isLength({ min: 1 }).withMessage('Username must not empty'),
		body('password').isLength({ min: 1 }).withMessage('Password must not empty'),
	],
	login,
)

router.get('/refresh-token', refreshToken)

module.exports = router
