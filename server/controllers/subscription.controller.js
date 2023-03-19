const stripe = require('stripe')(process.env.SREIPE_SECRET_KEY)

//TODO: create subscription

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
