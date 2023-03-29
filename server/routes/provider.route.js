const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { getProvider, updateProviderInfo, getOrganizationName } = require('../controllers/provider.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/:username', verifyJWT, getProvider)

router.patch('/:username', verifyJWT, updateProviderInfo)
router.patch(
	'/',
	[
		body('providerName')
			.isLength({ min: 1 })
			.withMessage('Provider Name is Required')
			.isLength({ max: 40 })
			.withMessage('Provider Name must be at most 40 characters')
			.matches(/^[a-zA-Z\s]+$/)
			.withMessage('Provider Name contains invalid characters'),
		body('address')
			.isLength({ min: 1 })
			.withMessage('Address is required')
			.isLength({ max: 255 })
			.withMessage('Address must be at most 255 characters'),
		body('website')
			.isLength({ min: 1 })
			.withMessage('Website is required')
			.isLength({ max: 250 })
			.withMessage('Website name must be at most 250 characters'),
		body('creditCardNumber')
			.isLength({ min: 1 })
			.withMessage('Credit card number is required')
			.isLength({ max: 16 })
			.withMessage('Credit card number must be at most 16 characters')
			.matches(/^[0-9]*$]/)
			.withMessage('Credit card number must contain only numeric characters'),
	],
	updateProviderInfo,
)

router.get('/name/:id', getOrganizationName);
module.exports = router
