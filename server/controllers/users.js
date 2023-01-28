const { validationResult } = require('express-validator')

exports.register = (req, res) => {
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		res.status(200).send("Register OK")
	}
}
