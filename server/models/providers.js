const mongoose = require('mongoose')
const { Schema } = mongoose

const providerSchema = new Schema({
	userID: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	name: {
		type: String,
	},
	address: {
		type: String,
	},
	website: {
		type: String,
	},
	creditCardNumber: {
		type: String,
	},
})

module.exports = mongoose.model('Providers', providerSchema)
