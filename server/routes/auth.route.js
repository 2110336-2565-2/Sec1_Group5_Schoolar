const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const {
	register,
	login,
	refreshToken,
	isDupe,
	logout,
	getUser,
} = require('../controllers/auth.controller')

router.post(
	'/register',
	[
		body('username')
			.isLength({ min: 1 })
			.withMessage('Username is Required')
			.isLength({ max: 40 })
			.withMessage('Username must be at most 40 characters')
			.matches(/^[a-zA-Z0-9._-]*$/)
			.withMessage('Username contain invalid charactor'),
		body('password')
			.isLength({ min: 8 })
			.withMessage('Password must be at least 8 characters')
			.isLength({ max: 40 })
			.withMessage('Passwords must be at most 40 characters')
			.matches(/(?=.*[A-Z])/)
			.withMessage('Password must have at least one uppercase letter')
			.matches(/(?=.*[a-z])/)
			.withMessage('Password must have at least one lower letter')
			.matches(/(?=.*[0-9!"#$%&'()*+,-./:;<=>?@_`{|}~\[\]\\])/)
			.withMessage('Password must have at least one digit number or special character')
			.matches(/^\S*$/)
			.withMessage('Passwords must not contain spaces'),
		body('email').isEmail().withMessage('Email is invalid'),
		body('role').isIn(['student', 'provider', 'admin']).withMessage('Role is invalid'),
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

router.get('/:username', getUser)
router.get('/refresh-token', refreshToken)

router.get('/isDupe/:field/:value', isDupe)

router.put('/logout', logout)

module.exports = router
