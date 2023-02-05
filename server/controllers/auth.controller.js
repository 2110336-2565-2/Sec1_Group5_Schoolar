const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const Provider = require('../models/providers')
const Student = require('../models/students')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId

exports.register = (req, res) => {
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		const { username, password, email, role, phoneNumber } = req.body
		const saltRounds = 10
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				User.create({ username, password: hash, email, role, phoneNumber }, (err, user) => {
					if (err) {
						res.status(400).json({ err })
					} else if (role == 'student') {
						Student.create(
							{ userID: new ObjectId(user._id), username },
							(err, student) => {
								if (err) {
									res.status(400).json({ err })
								} else {
									res.send(`Create student ${username} success`)
								}
							},
						)
					} else {
						Provider.create({ username }, (err, provider) => {
							if (err) {
								res.status(400).json({ err })
							} else {
								res.send(`Create provider ${username} success`)
							}
						})
					}
				})
			})
		})
	}
}

exports.login = async (req, res) => {
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		const { username, password } = req.body

		const foundUser = await User.findOne({ username }).select('+password')

		if (!foundUser) return res.sendStatus(401) //Unauthorized

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
				{ expiresIn: '1d' },
			)

			foundUser.refreshToken = refreshToken
			const result = await foundUser.save()
			console.log(result)

			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60 * 1000,
			})

			res.json({ accessToken, role: foundUser.role })
		} else {
			res.sendStatus(401)
		}
	}
}

exports.refreshToken = async (req, res) => {
	const cookies = req.cookies
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

exports.profile = (req, res) => {
	const cookies = req.cookies
	if (!cookies?.jwt) return res.sendStatus(401)
	const token = cookies.jwt

	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, async (err, decoded) => {
			if (err) return res.sendStatus(403)
			const { username, role } = await User.findById(decoded.id)
			res.json({ username, role })
		})
	} else {
		res.json(null)
	}
}

exports.isDupe = (req, res) => {
	const { field, value } = req.body
	User.countDocuments({ [field]: value }, (err, user) => {
		if (err) {
			res.status(400).json({ err })
		} else {
			res.send(!!user)
		}
	})
}
