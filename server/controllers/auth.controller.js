const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const Provider = require('../models/providers')
const Student = require('../models/students')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId

// POST after submit from US1-6/ US1-7
/*
 * @desc     Resigter user
 * @route    POST auth/register
 * @access   Public
 */

exports.register = (req, res) => {
	// #swagger.tags = ['auth']
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		const {
			username,
			password,
			email,
			role,
			firstName,
			lastName,
			birthdate,
			gender,
			phoneNumber,
			degree,
			school,
			program,
			householdIncome,
			targetNation,
			typeOfScholarship,
			employment,
			field,
			providerName,
			address,
			website,
			creditCardNumber,
			verifyStatus,
		} = req.body
		const saltRounds = 10
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				User.create({ username, password: hash, email, role }, (err, user) => {
					if (err) {
						res.status(400).send({ message: err.message })
					} else if (role == 'student') {
						Student.create(
							{
								userID: new ObjectId(user._id),
								username,
								firstName,
								lastName,
								birthdate,
								gender,
								phoneNumber,
								degree,
								school,
								program,
								householdIncome,
								targetNation,
								typeOfScholarship,
								employment,
								field,
							},
							(err, student) => {
								if (err) {
									res.status(400).json({ err })
								} else {
									res.send(`Create student ${username} success`)
								}
							},
						)
					} else {
						Provider.create(
							{
								userID: new ObjectId(user._id),
								providerName,
								address,
								website,
								creditCardNumber,
								phoneNumber,
								verifyStatus,
							},
							(err, provider) => {
								if (err) {
									res.status(400).json({ err })
								} else {
									res.send(`Create provider ${username} success`)
								}
							},
						)
					}
				})
			})
		})
	}
}

/*
 * @desc     Login user
 * @route    POST auth/login
 * @access   Public
 */
exports.login = async (req, res) => {
	// #swagger.tags = ['auth']
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		const { username, password } = req.body

		const foundUser = await User.findOne({ username }).select('+password')

		if (!foundUser) return res.status(401).json({ message: 'Not found user' }) //res.sendStatus(401) //Unauthorized

		const match = await bcrypt.compare(password, foundUser.password)
		if (match) {
			const accessToken = jwt.sign(
				{
					UserInfo: {
						username: foundUser.username,
						role: foundUser.role,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15m' },
			)
			const refreshToken = jwt.sign(
				{ username: foundUser.username },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: '7d' },
			)

			foundUser.refreshToken = refreshToken
			const result = await foundUser.save()
			console.log(result)

			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})

			res.json({ accessToken, role: foundUser.role })
		} else {
			res.status(401).json({ message: 'Not match' }) //res.sendStatus(401)
		}
	}
}

/*
 * @desc     Refresh token
 * @route    GET auth/refresh-token
 * @access   Public
 */
exports.refreshToken = async (req, res) => {
	// #swagger.tags = ['auth']
	const cookies = req.cookies

	console.log(cookies)

	if (!cookies?.jwt) return res.sendStatus(401)
	const refreshToken = cookies.jwt

	const foundUser = await User.findOne({ refreshToken }).exec()
	if (!foundUser) return res.sendStatus(403)

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: decoded.username,
					roles: foundUser.role,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' },
		)
		res.json({ accessToken, role: foundUser.role })
	})
}

/*
 * @desc     Check Duplicate field
 * @route    GET auth/isDupe/:field/:value
 * @access   Public
 */
exports.isDupe = (req, res) => {
	// #swagger.tags = ['auth']
	const { field, value } = req.params
	console.log({ field, value })
	User.countDocuments({ [field]: value }, (err, user) => {
		if (err) {
			res.status(400).json({ err })
		} else {
			res.send(!!user)
		}
	})
}

exports.logout = async (req, res) => {
	// #swagger.tags = ['auth']
	//const cookies = req.cookies

	const cookies = req.cookies
	try {
		const user = await User.findOne({ refreshToken: cookies.jwt })
		if (!user) return res.status(401).json({ message: 'Not found user' })

		user.refreshToken = undefined
		await user.save()

		//res.cookies('jwt', '', {maxAge:1});

		res.clearCookie('jwt', {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})
		res.clearCookie('refreshToken')
		res.send('Logged out successfully')
	} catch (error) {
		res.status(400).send({ message: error.message })
	}
}

/*
 * @desc     Get user info
 * @route    GET user/:username
 * @access   Private
 */
const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

exports.getUser = async (req, res) => {
	// #swagger.tags = ['provider']
	const result = validationResult(req)
	handleValidationResult(result, res)
	try {
		const username = req.params.username

		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		return res.status(200).json({ user })
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
