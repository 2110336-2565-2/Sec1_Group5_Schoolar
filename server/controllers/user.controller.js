const { validationResult } = require('express-validator')

const User = require('../models/users')

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
