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
	// #swagger.description = 'Get information of the given provider.'
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
 * @route    PATCH /provider/:username
 * @access   Private
 */
exports.updateProviderInfo = async (req, res) => {
	// #swagger.tags = ['provider']
	// #swagger.description = 'Update information of the provider.'
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.params.username
		const { organizationName, address, website, creditCardNumber, phoneNumber } = req.body

		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const provider = await Provider.findOne({ username })
		if (!provider) throw new Error('Provider not found')

		Object.assign(provider, {
			organizationName,
			address,
			website,
			creditCardNumber,
			phoneNumber,
		})

		Object.assign(user, { phoneNumber })

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

/*
 * @desc     Get organization name
 * @route    GET /provider/name/:id
 * @access   Private
 */

exports.getOrganizationName = async (req, res) => {
	// #swagger.tags = ['provider']
	// #swagger.description = 'Get organization name of the given provider id.'
	try {
		const id = req.params.id
		const provider = await Provider.findById(id)
		Provider.findById(id, function (err, docs) {
			if (err) {
				return res.status(404).json({ message: 'Provider not found' })
			} else {
				return res.status(200).json({ organizationName: provider.organizationName })
			}
		})
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
