const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Scholarship = require('../models/scholarship')
const Provider = require('../models/providers')
/*
 * @desc     Create check out session and return url for payment page.
 *			 If payment success, redirect to a succes URL. If cancel payment, redirect to cancel URL
 * @route    POST /subscription/checkout/:scholarshipId
 * @access   Private
 */
exports.createCheckOutSession = async (req, res) => {
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Create check out session and return URL for payment page. If payment success, redirect to a succes URL. If unsuccess, redirect to cancel URL.'
	 */
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
 * @desc     Recieve event from stripe to check if the payment session ids completed then update subscription id in scholarship.
 * @route    POST /subscription/webhook
 * @access   Private
 */
exports.setSubscriptionID = async (req, res) => {
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Recieve event from Stripe to check if the payment session ids completed then update subscription id in scholarship.'
	 */
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

	const scholarship = await Scholarship.findById(scholarshipId)
	if (type === 'checkout.session.completed') {
		if (scholarship) {
			scholarship.subscription = subscriptionID
			scholarship.status = true
			await scholarship.save()
		}
		// Add message to unreaded notification
		const provider = await Provider.findByIdAndUpdate(scholarship.provider, {
			$push: {
				'notification.unreaded': {
					message: `Payment Successful: ${scholarship.scholarshipName}`,
					timestamp: Date.now(),
				},
			},
		})
	} else if (type === 'charge.failed') {
		// Add message to unreaded notification
		const provider = await Provider.findByIdAndUpdate(scholarship.provider, {
			$push: {
				'notification.unreaded': {
					message: `Payment Fail: ${scholarship.scholarshipName}`,
					timestamp: Date.now(),
				},
			},
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
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Get a list of subscriptions that have not been canceled.'
	 */
	try {
		const subscriptions = await stripe.subscriptions.list()
		return res.status(200).json(subscriptions)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Retrieves the subscription with the given id
 *           https://stripe.com/docs/api/subscriptions/retrieve
 * @route    GET /subscription/:id
 * @access   Private
 */
exports.getSubscription = async (req, res) => {
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Retrieves the subscription with the given id.'
	 */
	try {
		const id = req.params.id
		const subscription = await stripe.subscriptions.retrieve(id)
		return res.status(200).json(subscription)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Get Subscription status whether subscribing or unsubscribing by scholarship id
 * @route    GET /subscription/status/:scholarshipId
 * @access   Private
 */
exports.getSubscriptionStatus = async (req, res) => {
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Get subscription status whether subscribing or unsubscribing by scholarship id.'
	 */
	try {
		const scholarship = await Scholarship.findById(req.params.scholarshipId)
		return res.status(200).json({ status: scholarship.status })
	} catch (error) {
		return res.status(500).json(`Error subscription status`)
	}
}

/*
 * @desc     Get nextPaymentDate by subscription id
 * @route    GET /subscription/next-payment-date/:id
 * @access   Private
 */
exports.getNextPaymentDate = async (req, res) => {
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Get next payment date of the subscription id.'
	 */
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
 * @route    GET /subscription/payment-history/:id
 * @access   Private
 */
exports.getSubscriptionPaymentHistory = async (req, res) => {
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Get payment history of the subscription id.'
	 */
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
				date: new Date(invoice.created * 1000), //.toLocaleString(),
				amount: invoice.amount_paid / 100,
				currency: invoice.currency.toUpperCase(),
				scholarshipName: scholarship ? scholarship.scholarshipName : null,
				provider: scholarship ? scholarship.provider : null,
			}
			history[invoice.status].push(paymentDetails)
		}
		return res.status(200).json({ history })
	} catch (error) {
		return res.status(500).json(`Error fetching payment history: ${error.message}`)
	}
}

/*
 * @desc     Cancel Subscription by scholarship id
 * @route    DELETE /subscription/unsubscripe/:scholarshipId
 * @access   Private
 */
exports.cancelSubscription = async (req, res) => {
	/** #swagger.tags = ['subscription']
	 *  #swagger.description = 'Unsubscripe a given scholarship id.'
	 */
	try {
		const scholarship = await Scholarship.findByIdAndUpdate(req.params.scholarshipId, {
			$set: { status: false, subscription: null },
		})
		const deleted = await stripe.subscriptions.del(scholarship.subscription)
		return res.status(200).json('cancel subscription success')
	} catch (error) {
		return res.status(500).json('Error cancel subscription')
	}
}
