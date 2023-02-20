const Provider = require('../models/providers')
const User = require('../models/users')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

/*
 * @desc     Get provider info
 * @route    GET provider/:username
 * @access   Private
 */
exports.getProvider = async (req, res) => {
	// #swagger.tags = ['provider']
	const result = validationResult(req)
	handleValidationResult(result, res)
	try {
		const username = req.params.username

		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const provider = await Provider.findOne({ username })
		if (!provider) throw new Error('Provider not found')

		return res.status(200).json({ provider, user })
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Update provider info
 * @route    PATCH /provider
 * @access   Private
 */
exports.updateProviderInfo = async (req, res) => {
	// #swagger.tags = ['provider']
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.params.username
		const { providerName, address, website, creditCardNumber, phoneNumber } = req.body
		console.log(req.body)
		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const provider = await Provider.findOne({ username })
		if (!provider) throw new Error('Provider not found')

		Object.assign(provider, {
			providerName,
			address,
			website,
			creditCardNumber,
			phoneNumber,
		})

		await user.save()
		await provider.save()

		return res.status(200).json({
			message: 'Provider information updated successfully',
			provider,
		})
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
