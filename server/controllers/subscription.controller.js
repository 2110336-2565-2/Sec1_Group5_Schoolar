const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

/*
 * @desc     create check out session
 * @route    POST
 * @access   Private
 */
exports.createCheckOutSession = async (req, res, next) => {
	const { priceId } = req.body
	// Replace "your_price_id" with the actual price ID you set up in your Stripe Dashboard
	const DEFAULT_PRICE_ID = 'your_price_id'
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId || DEFAULT_PRICE_ID,
					quantity: 1,
				},
			],
			mode: 'subscription',
			success_url: `https://your-website.com/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: 'https://your-website.com/canceled',
		})

		res.json({ id: session.id })
	} catch (error) {
		res.status(500).json({ error: 'An error occurred, please try again.' })
	}
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
