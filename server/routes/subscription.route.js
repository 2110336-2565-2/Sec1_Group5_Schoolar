const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
	getSubscription,
	getSubscriptions,
	getNextPaymentDate,
} = require('../controllers/subscription.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', verifyJWT, getSubscriptions)
router.get('/:id', verifyJWT, getSubscription)
router.get('/next-payment-date/:id', verifyJWT, getNextPaymentDate)

module.exports = router