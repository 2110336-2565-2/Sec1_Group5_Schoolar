const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
	getSubscription,
	getSubscriptions,
	getNextPaymentDateByEmail,
} = require('../controllers/subscription.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', getSubscriptions)
router.get('/:id', getSubscription)
router.get('/next-payment-date/:email', getNextPaymentDateByEmail)

module.exports = router
