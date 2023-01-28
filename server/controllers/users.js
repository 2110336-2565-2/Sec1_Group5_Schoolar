const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const saltRounds = 10

exports.register = (req, res) => {
    //TODO check duplicate username
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		const { username, password, email, type } = req.body
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				// Store hash in your password DB.
				console.log('hash password', hash)
				if (type == 'student') {
					res.status(200).send('Register student OK')
				} else {
					res.status(200).send('Register provider OK')
				}
			})
		})
	}
}
