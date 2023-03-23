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
 * @access   Public //TODO: might change later
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
 * @access   Public //TODO: might change later
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
 * @desc     Get id and nextPaymentDate from customer email
 * @route    GET /subscription/next-payment-date/:email
 * @access   Public //TODO: might change later
 */
exports.getNextPaymentDateByEmail = async (req, res) => {
	//Not done yet, it depends on US6-1
	try {
		const email = req.params.email
		console.log(email)
		const customers = await stripe.customers.list({ email })
		console.log(customers)
		if (customers.data.length === 0) {
			return res.status(404).json({ message: 'No customer found with that email' })
		}
		const customer_id = customers.data[0].id //assume only 1 customer id for 1 customer email
		const subscriptions = await stripe.subscriptions.list({ customer: customer_id })
		const nextPaymentDates = subscriptions.data.map((subscription) => {
			return {
				id: subscription.id,
				nextPaymentDate: subscription.current_period_end,
			}
		})
		return res.status(200).json(nextPaymentDates)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
