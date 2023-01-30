const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/users')
const Provider = require('../models/providers')
const Student = require('../models/students')
const Users = require('../models/users')

exports.register = (req, res) => {
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		const { username, password, email, type } = req.body
		const saltRounds = 10
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				User.create({ username, password: hash, email, type }, (err, user) => {
					if (err) {
						res.status(400).json({ err })
					} else if (type == 'student') {
						Student.create({ username }, (err, student) => {
							if (err) {
								res.status(400).json({ err })
							} else {
								res.send(`Create student ${username} success`)
							}
						})
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
			// create JWTs
			res.json({ success: `User ${username} is logged in!` })
		} else {
			res.sendStatus(401)
		}
	}
}
