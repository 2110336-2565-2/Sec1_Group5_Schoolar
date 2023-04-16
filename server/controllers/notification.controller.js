const Provider = require('../models/providers')
const { validationResult } = require('express-validator')

const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

/*
 * @desc     Get all notifications both readed and unreaded.
 * @route    GET /notifications
 * @access   Private
 */
exports.getNotifications = async (req, res) => {
	// #swagger.tags = ['notification']
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.user
		const role = req.role
		if (role == 'provider') {
			const provider = await Provider.findOne({ username })
			if (!provider) throw new Error('Provider not found')
			res.status(200).json(provider.notification)
		} else {
			res.status(200).json({
				message: 'this user is not a provider so there is no notifiaction provided',
			})
		}
	} catch (error) {
		console.error(error)
		res.status(400).json(error.message)
	}
}

/*
 * @desc     Update readed and unreaded, move all unread message to read message.
 * @route    PUT /notifications
 * @access   Private
 */
exports.updateNotification = async (req, res) => {
	// #swagger.tags = ['notification']
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.user
		const role = req.role
		if (role == 'provider') {
			const provider = await Provider.findOne({ username })
			if (!provider) throw new Error('Provider not found')
			for (noti of provider.notification.unreaded) {
				provider.notification.readed.push(noti)
			}
			provider.notification.unreaded = []
			await provider.save()

			res.status(200).json({
				message: 'readed',
			})
		} else {
			res.status(200).json({
				message: 'this user is not a provider so there is no notifiaction provided',
			})
		}
	} catch (error) {
		console.error(error)
		res.status(400).json(error.message)
	}
}
