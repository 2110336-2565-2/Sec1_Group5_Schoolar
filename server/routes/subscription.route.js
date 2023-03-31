const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
	createCheckOutSession,
	setSubscriptionID,
	getSubscription,
	getSubscriptions,
	getNextPaymentDate,
	getSubscriptionPaymentHistory,
	getSubscriptionStatus,
	cancelSubscription,
} = require('../controllers/subscription.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', verifyJWT, getSubscriptions)
router.post('/checkout/:scholarshipId', verifyJWT, createCheckOutSession)
router.post('/webhook', setSubscriptionID)
router.get('/:id', verifyJWT, getSubscription)
router.get('/next-payment-date/:id', verifyJWT, getNextPaymentDate)
router.get('/payment-history/:id', verifyJWT, getSubscriptionPaymentHistory)
router.get('/status/:scholarshipId', verifyJWT, getSubscriptionStatus)
router.get('/unsubscripe/:scholarshipId', verifyJWT, cancelSubscription)
module.exports = router
