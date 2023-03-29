const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const Provider = require('../models/providers')
const Student = require('../models/students')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId
const mongoose = require('mongoose')
const { toDate } = require('../utils/dateUtils')

/*
 * @desc     Resigter user
 * @route    POST auth/register
 * @access   Public
 */

exports.register = async (req, res) => {
	// #swagger.tags = ['auth']
	const result = validationResult(req)
	if (!result.isEmpty()) {
		return res.status(400).json({ message: result.array() })
	}

	const {
		username,
		password,
		email,
		role,
		firstName,
		lastName,
		birthdate: birthdateString,
		gender,
		phoneNumber,
		gpax,
		degree,
		school,
		program,
		targetNation,
		typeOfScholarship,
		fieldOfInterest,
		organizationName,
		address,
		website,
		verifyStatus,
	} = req.body

	//birthdate can be 20/02/2023 or 2023-02-22T17:00:00.000Z format
	const birthdate = toDate(birthdateString)
	const session = await mongoose.startSession()
	session.startTransaction()

	try {
		const saltRounds = 10
		const salt = await bcrypt.genSalt(saltRounds)
		const hash = await bcrypt.hash(password, salt)
		const user = await User.create([{ username, password: hash, email, phoneNumber, role }], {
			session,
		})
		if (role === 'student') {
			const student = await Student.create(
				[
					{
						username,
						firstName,
						lastName,
						birthdate,
						gender,
						gpax,
						degree,
						school,
						program,
						targetNation,
						typeOfScholarship,
						fieldOfInterest,
					},
				],
				{ session },
			)
			res.send(`Register ${username} as student success!`)
		} else {
			const provider = await Provider.create(
				[
					{
						username,
						organizationName,
						address,
						website,
						verifyStatus,
					},
				],
				{ session },
			)
			res.send(`Register ${username} as provider success!`)
		}
		await session.commitTransaction()
	} catch (error) {
		await session.abortTransaction()
		res.status(400).send({ error: error.message })
	} finally {
		session.endSession()
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
		res.status(400).json({ message: result.array() })
	} else {
		const { usernameEmail, password } = req.body

		let foundUser = null
		if (usernameEmail.includes('@')) {
			foundUser = await User.findOne({ email: usernameEmail }).select('+password')
		} else {
			foundUser = await User.findOne({ username: usernameEmail }).select('+password')
		}

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
			// console.log(result)

			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
			})

			res.json({ accessToken, role: foundUser.role, username: foundUser.username })
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

	// console.log(cookies)

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
					role: foundUser.role,
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
 * @route    GET auth/isDupe/:role/:field/:value
 * @access   Public
 */
exports.isDupe = (req, res) => {
	// #swagger.tags = ['auth']
	const { role, field, value } = req.params
	switch (role) {
		case 'user':
			User.countDocuments({ [field]: value }, (err, user) => {
				if (err) {
					res.status(400).json({ err })
				} else {
					res.send(!!user)
				}
			})
			break
		case 'student':
			Student.countDocuments({ [field]: value }, (err, student) => {
				if (err) {
					res.status(400).json({ err })
				} else {
					res.send(!!student)
				}
			})
			break
		case 'provider':
			Provider.countDocuments({ [field]: value }, (err, provider) => {
				if (err) {
					res.status(400).json({ err })
				} else {
					res.send(!!provider)
				}
			})
			break
		default:
			res.status(400).send('Invalid role')
	}
}

exports.logout = async (req, res) => {
	// #swagger.tags = ['auth']
	const cookies = req.cookies
	try {
		const user = await User.findOne({ refreshToken: cookies.jwt })
		if (!user) return res.status(401).json({ message: 'Not found user' })

		user.refreshToken = undefined
		await user.save()

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
