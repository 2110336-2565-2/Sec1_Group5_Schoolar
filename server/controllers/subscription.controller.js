const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//TODO: create subscription

/*
 * @desc     Get a list of subscriptions that have not been canceled
 *           https://stripe.com/docs/api/subscriptions/list
 * @route    GET /subscription/
 * @access   Private
 */
exports.getSubscriptions = async (req, res) => {
	// #swagger.tags = ['subscription']
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
	// #swagger.tags = ['subscription']
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
	// #swagger.tags = ['subscription']
	try {
		const id = req.params.id // Subscription id from scholarship model
		const subscription = await stripe.subscriptions.retrieve(id)
		return res.status(200).json(new Date(subscription.current_period_end * 1000)) // Convert a Unix timestamp to date
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Get Subscription Payment History by subscription id
 * @route    GET /paymentHistory/:subscriptionId
 * @access   Private
 */
exports.getSubscriptionPaymentHistory = async (req, res) => {
	const subscriptionId = req.params.subscriptionId
	try {
		// Get the invoice list for the given subscription
		const invoices = await stripe.invoices.list({
			subscription: subscriptionId,
			limit: 24,
		})
		const history = { paid: [], uncollectible: [] }
		// Iterate through the invoices and print the payment details
		for (let invoice of invoices.data) {
			history[invoice.status].push(new Date(invoice.created * 1000).toLocaleString())
		}
		return res.status(200).json({ history: history })
	} catch (error) {
		console.error(`Error fetching payment history: ${error.message}`)
	}
}
