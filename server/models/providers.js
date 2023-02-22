const mongoose = require('mongoose')
const { Schema } = mongoose

const providerSchema = new Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	providerName: {
		required: true,
		type: String,
		maxLength: 40,
		trim: true,
	},
	address: {
		required: true,
		type: String,
		maxLength: 255,
		lowercase: true,
		trim: true,
	},
	website: {
		required: true,
		type: String,
		maxLength: 250,
		lowercase: true,
		trim: true,
	},
	phoneNumber: {
		required: true,
		type: String,
		maxLength: 10,
		unique: true,
		trim: true,
	},
	creditCardNumber: {
		required: true,
		type: String,
		maxLength: 16,
		unique: true,
		trim: true,
	},
})

module.exports = mongoose.model('Providers', providerSchema)
