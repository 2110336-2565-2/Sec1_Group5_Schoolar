const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//TODO: create subscription

/*
 * @desc     Get a list of subscriptions that have not been canceled
 *           https://stripe.com/docs/api/subscriptions/list
 * @route    GET /subscription/
 * @access   Private
 */
exports.getSubscriptions = async (req, res) => {
	try {
		const subscriptions = await stripe.subscriptions.list()
		return res.status(400).json(subscriptions)
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
		return res.status(400).json(subscription)
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
		return res.status(400).json(new Date(subscription.current_period_end * 1000)) // Convert a Unix timestamp to date
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
