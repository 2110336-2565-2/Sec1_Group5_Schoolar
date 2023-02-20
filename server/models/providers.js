const mongoose = require('mongoose')
const { Schema } = mongoose

const providerSchema = new Schema({
	username: {
		type: String,
		ref: 'User',
    required: true,
		type: String,
		maxLength: 40,
		unique: true,
		trim: true,
	},
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
	creditCardNumber: {
		required: true,
		type: String,
		maxLength: 16,
		trim: true,
	},
})

module.exports = mongoose.model('Providers', providerSchema)
