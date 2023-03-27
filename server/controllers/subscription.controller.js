const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Scholarship = require('../models/scholarship')
/*
 * @desc     create check out session
 * @route    POST /subscription/checkout/:scholarshipId
 * @access   Private
 */
exports.createCheckOutSession = async (req, res, next) => {
	try {
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: process.env.PRICE_ID,
					quantity: 1,
				},
			],
			mode: 'subscription',
			// redirect to home?
			success_url: `http://localhost:8080/home.html`,
			cancel_url: `http://localhost:8080/home.html`,
		})
		return res.json({ url: session.url })
	} catch (error) {
		return res
			.status(500)
			.json({ error: 'An error occur, cannot create check out session for subscription' })
	}
}

/*
 * @desc     create check out session
 * @route    POST /subscription/webhook
 * @access   Private
 */
exports.setSubscriptionID = async (req, res) => {
	let subscriptionID
	let type
	// Parse the webhook payload
	try {
		subscriptionID = req.body.data.object.subscription
		type = req.body.type
	} catch (err) {
		return res.status(400).send('Webhook Error: ' + err.message)
	}

	if (type === 'checkout.session.completed') {
		const scholarship = await Scholarship.findByIdAndUpdate(req.params.scholarshipId, {
			$set: { subscription: subscriptionID },
		})
	}
	console.log(subscriptionID)
	return res.status(200).json({ subscription: subscriptionID })
}
/*
 * @desc     Get a list of subscriptions that have not been canceled
 *           https://stripe.com/docs/api/subscriptions/list
 * @route    GET /subscription/
 * @access   Private
 */
exports.getSubscriptions = async (req, res) => {
	try {
		const subscriptions = await stripe.subscriptions.list()
		return res.status(200).json(subscriptions)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Retrieves the subscription with the given ID
 *           https://stripe.com/docs/api/subscriptions/retrieve
 * @route    GET /subscription/:id
 * @access   Private
 */
exports.getSubscription = async (req, res) => {
	try {
		const id = req.params.id
		const subscription = await stripe.subscriptions.retrieve(id)
		return res.status(200).json(subscription)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Get nextPaymentDate by subscription id
 * @route    GET /subscription/next-payment-date/:id
 * @access   Private
 */
exports.getNextPaymentDate = async (req, res) => {
	try {
		const id = req.params.id // Subscription id from scholarship model
		const subscription = await stripe.subscriptions.retrieve(id)
		return res.status(200).json(new Date(subscription.current_period_end * 1000)) // Convert a Unix timestamp to date
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
