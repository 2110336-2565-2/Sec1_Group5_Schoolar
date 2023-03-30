const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Scholarship = require('../models/scholarship')
/*
 * @desc     Create check out session and return url for payment page.
 *			 If payment success, redirect to a succes URL. If cancel payment, redirect to cancel URL
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
			// need front end adjustment to redirect it to page after success or page after cancel payment
			success_url: `http://localhost:3000/payment/success`,
			cancel_url: `http://localhost:3000/payment/failed`,
			// --------------------------------------------
			client_reference_id: req.params.scholarshipId,
		})
		// return url for payment prebuild page of stripe, needed front end to redirect to this url
		return res.json({ url: session.url })
	} catch (error) {
		return res
			.status(500)
			.json({ error: 'An error occur, cannot create check out session for subscription' })
	}
}

/*
 * @desc     Get event from stripe to check if the payment session ids completed then update subscription ID in scholarship.
 * @route    POST /subscription/webhook
 * @access   Private
 */
exports.setSubscriptionID = async (req, res) => {
	let subscriptionID
	let type
	let scholarshipId
	try {
		subscriptionID = req.body.data.object.subscription
		type = req.body.type
		scholarshipId = req.body.data.object.client_reference_id
	} catch (err) {
		return res.status(400).send('Webhook Error: ' + err.message)
	}

	if (type === 'checkout.session.completed') {
		const scholarship = await Scholarship.findByIdAndUpdate(scholarshipId, {
			$set: { subscription: subscriptionID },
		})
	}
	return res.status(200).json({ subscription: subscriptionID, scholarship: scholarshipId })
}
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
	const subscriptionId = req.params.id
	const scholarship = await Scholarship.findOne({ subscription: subscriptionId })
	try {
		// Get the invoice list for the given subscription
		const invoices = await stripe.invoices.list({
			subscription: subscriptionId,
			limit: 24,
		})
		const history = { paid: [], uncollectible: [] }
		// Iterate through the invoices and print the payment details
		for (let invoice of invoices.data) {
			const paymentDetails = {
				date: new Date(invoice.created * 1000).toLocaleString(),
				amount: invoice.amount_paid / 100,
				currency: invoice.currency.toUpperCase(),
				scholarshipName: scholarship ? scholarship.scholarshipName : null,
			}
			history[invoice.status].push(paymentDetails)
		}
		return res.status(200).json({ history })
	} catch (error) {
		console.error(`Error fetching payment history: ${error.message}`)
	}
}
