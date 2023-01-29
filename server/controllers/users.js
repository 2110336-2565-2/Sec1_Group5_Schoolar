const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/users')

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
						res.status(200).send('Register student OK')
					} else {
						res.status(200).send('Register provider OK')
					}
				})
			})
		})
	}
}
