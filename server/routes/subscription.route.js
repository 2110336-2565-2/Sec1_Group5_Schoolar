const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
	getSubscription,
	getSubscriptions,
	getNextPaymentDate,
	getAllSubscriptionPaymentHistory,
	getSubscriptionPaymentHistory,
} = require('../controllers/subscription.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/payment-history', verifyJWT, getAllSubscriptionPaymentHistory)
router.get('/', verifyJWT, getSubscriptions)
router.get('/:id', verifyJWT, getSubscription)
router.get('/next-payment-date/:id', verifyJWT, getNextPaymentDate)
router.get('/payment-history/:id', verifyJWT, getSubscriptionPaymentHistory)

module.exports = router
